const express = require('express');
const app = express();
const env = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { param, query, validationResult } = require('express-validator');
const sanitize = require('mongo-sanitize');
const Joi = require('joi');

// Apply gzip compression
app.use(compression());
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Environment variables validation
const envVarsSchema = Joi.object({
    PORT: Joi.number().required(),
    DB_CONNECTION_STRING: Joi.string().required()
}).unknown().required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const PORT = envVars.PORT;

//Rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100 //Limit each IP to 100 requests per window
});
app.use('/api/', apiLimiter);

//Connect to the database
mongoose.connect(envVars.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((error) => {
        console.log(`Error connecting to the database: ${error}`);
    });

//Define Movie Schema
const movieSchema = new mongoose.Schema({
    plot: String,
    genres: [String],
    runtime: Number,
    rated: String,
    cast: [String],
    poster: String,
    title: String,
    fullplot: String,
    countries: [String],
    released: Date,
    directors: [String],
    writers: [String],
    awards: {
        wins: Number,
        nominations: Number,
        text: String
    },
    lastupdated: String,
    year: Number,
    imdb: {
        rating: Number,
        votes: Number,
        id: Number
    },
    type: String,
    tomatoes: {
        viewer: {
            rating: Number,
            numReviews: Number,
            meter: Number
        },
        dvd: Date,
        lastUpdated: Date
    },
    num_mflix_comments: Number
});

const Movie = mongoose.model('Movie', movieSchema);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'An internal server error occurred.' });
});

//GET endpoint with pagination for movies
app.get('/api/movies', async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; //Pagination
        const movies = await Movie.find({})
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean(); //Use lean for better performance

        const totalMovies = await Movie.countDocuments({});
        
        res.status(200).send({
            movies,
            currentPage: Number(page),
            totalPages: Math.ceil(totalMovies / limit),
            totalMovies
        });
    } catch (error) {
        next(error); //Pass the error to the error handling middleware
    }
});

//GET endpoint with movie ID validation and fetching
app.get('/api/movies/:id', [
    param('id').isMongoId().withMessage('Invalid movie ID'), //Validate movie ID
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const movieId = req.params.id;
        const movie = await Movie.findById(movieId).lean();

        if (!movie) {
            return res.status(404).send({ error: `Movie with ID: ${movieId} not found` });
        }

        res.status(200).send(movie);
    } catch (error) {
        next(error);
    }
});

//Search movies with query validation and sanitization
app.get('/api/movies/q/search', [
    query('query').notEmpty().trim().escape(), //Validate and sanitize query param
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const query = sanitize(req.query.query);
        const { page = 1, limit = 10 } = req.query; //Pagination

        const regex = new RegExp(query, 'i'); //Case-insensitive search
        const movies = await Movie.find({ title: regex })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean();

        const totalMovies = await Movie.countDocuments({ title: regex });

        res.status(200).send({
            movies,
            currentPage: Number(page),
            totalPages: Math.ceil(totalMovies / limit),
            totalMovies
        });
    } catch (error) {
        next(error);
    }
});

//POST endpoint to create a new movie
app.post('/api/movies', async (req, res, next) => {
    try {
        const movieData = req.body;

        if (!movieData || Object.keys(movieData).length === 0) {
            return res.status(400).send({ error: 'No movie data provided.' });
        }

        const movie = await Movie.create(movieData);

        res.status(201).send(movie); // 201 for created resource
    } catch (error) {
        next(error);
    }
});

//PUT endpoint to update a movie
app.put('/api/movies/:_id', [
    param('_id').isMongoId().withMessage('Invalid movie ID'),
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const movieData = req.body;

        if (!movieData || Object.keys(movieData).length === 0) {
            return res.status(400).send({ error: 'No movie data provided.' });
        }

        const movie = await Movie.findByIdAndUpdate(req.params._id, movieData, { new: true });

        if (!movie) {
            return res.status(404).send({ error: `Movie with ID: ${req.params._id} not found` });
        }

        res.status(200).send(movie);
    } catch (error) {
        next(error);
    }
});

//DELETE endpoint to delete a movie
app.delete('/api/movies/:_id', [
    param('_id').isMongoId().withMessage('Invalid movie ID'),
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const response = await Movie.deleteOne({ "_id": req.params._id });

        if (response.deletedCount === 0) {
            return res.status(404).send({ error: `Movie with ID: ${req.params._id} not found` });
        }

        res.status(200).send({ message: `Movie with ID: ${req.params._id} deleted!` });
    } catch (error) {
        next(error);
    }
});

//Start the server
app.listen(PORT, () => {
    try {
        console.log(`Connected to server on PORT: ${PORT}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});