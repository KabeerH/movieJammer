const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

//Increase the body size limit for JSON payloads
app.use(express.json({ limit: '10mb' }));

// JSON Web Token Setup
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.JWT_SECRET
};

//Passport JWT Strategy
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

app.use(passport.initialize());

//MongoDB Connection
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to database!');
    })
    .catch((error) => {
        console.log(`Error connecting to database: ${error}`);
    });

    //User Schema
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        dob: { type: Date, required: true },
        phone: { type: Number },
        location: { type: String, default: null },
        bio: { type: String },
        history: [String],
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const User = mongoose.model('User', userSchema);

//User Registration
app.post('/api/users/register', async (req, res) => {
    const { username, password, confirmPassword, email, name, dob, phone, location, bio } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Check for existing username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username is already taken' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email is already registered' });
            }
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new user instance
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            name,
            dob,
            phone,
            location,
            bio,
        });

        //Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: `Error registering user: ${error}` });
    }
});


//Login 
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const payload = { 
            id: user._id,
            username: user.username, 
            email: user.email,       
            name: user.name,
            dob: user.dob,
            phone: user.phone,
            location: user.location,
            bio: user.bio,
            history: user.history,
            favorites: user.favorites
        };

        const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '1h' });
        res.json({ 
            message: 'Login successful', 
            token, 
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ error: `Error logging in: ${error}` });
    }
});

//Get User Profile (Protected Route)
app.get('/api/users/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ error: `Error fetching user profile: ${error}` });
    }
});

//Update User Profile (Protected Route)
app.put('/api/users/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { username, email, name, dob, phone, location, bio, password } = req.body;

    try {
        const updateData = { username, email, name, dob, phone, location, bio };
        
        // Ifpassword is provided, hash it before updating
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        await User.findByIdAndUpdate(req.user._id, updateData);
        res.json({ message: 'User profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: `Error updating user profile: ${error}` });
    }
});

//Delete User Account (Protected Route)
app.delete('/api/users/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.json({ message: 'User account deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: `Error deleting user account: ${error}` });
    }
});

//Get user's favorite movies (Protected Route)
app.get('/api/users/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user.favorites); //Respond with the user's favorite movies
    } catch (error) {
        res.status(500).json({ error: `Error fetching favorites: ${error}` });
    }
});

//Add a movie to the user's favorites (Protected Route)
app.post('/api/users/favorites/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const movieId = new mongoose.Types.ObjectId(req.params.movieId);
        const user = req.user;

        if (user.favorites.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        user.favorites.push(movieId);
        await user.save();
        res.status(200).json({ message: 'Movie added to favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding movie to favorites' });
    }
});

//Remove a movie from the user's favorites (Protected Route)
app.delete('/api/users/favorites/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const user = req.user;

        //Ensure the movieId is in string format for comparison
        const movieIdStr = String(movieId);

        user.favorites = user.favorites.filter(id => String(id) !== movieIdStr);
        await user.save();

        res.status(200).json({ message: 'Movie removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing movie from favorites' });
    }
});

//Start Server
app.listen(PORT, () => {
    console.log(`Connected to server on PORT: ${PORT}`);
});
