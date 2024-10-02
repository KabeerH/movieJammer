const express = require('express');
const app = express();
const env = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors());

const PORT = process.env.PORT;

//connect to database
mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => {
    console.log('Connected to database!');
})
.catch((error) => {
    console.log(`Error connecting to database: ${error}`);
})

//Define Schemas
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

//GET endpoint to get all movies
app.get('/api/movies', async (req, res) => {
    try {
        const response = await Movie.find({})
        res.status(200).send(response)
    } catch (error) {
        console.error(`Error at 'GET /api/movies' endpoint: ${error}`)
        res.status(500).send({ error: 'An error ocurred while getting all the movies.' })
    }
});

//POST endpoint to make a new movie
app.post('/api/movies', async (req, res) => {
    try {
        const movieData = req.body; 
        const response = await Movie.insert(movieData); 

        res.status(200).send(response);
    } catch (error) {
        console.error(`Error at 'POST /api/movies' endpoint: ${error}`);
        res.status(500).send({ error: 'An error occurred while creating the movie.' }); 
    }
});

//Update endpoint to update a preexisting movie
app.put('/api/movies/:_id', async (req, res) => {
    try {
        const movieData = req.body
        const response = await Movie.updateOne(movieData)

        res.status(200).send(response)
    } catch (error) {
        console.error(`Error at 'PUT /api/movies/:_id' endpoint: ${error}`)
        res.status(500).send({ error: 'An error occurred while updating a movie.' })
    }
})

//Delete a preexisting movie
app.delete('/api/movies/:_id', async (req, res) => {
    try {
        const response = await Movie.deleteOne({"_id": req.params._id})

        res.status(200).send(response)
        console.log(`Movie with id: ${req.params._id} deleted!`)
    } catch (error) {
        console.error(`Error at 'DELETE /api/movies/:_id' endpoint: ${error}`)
        res.status(500).send({ error: 'An error occurred while deleting a movie.' })
    }
})


app.listen(PORT, () => {
    try {
        console.log(`Connected to server on PORT: ${PORT}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});
