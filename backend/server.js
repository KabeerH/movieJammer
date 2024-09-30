const express = require('express');
const app = express();
const env = require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => {
    console.log('Connected to database!');
})
.catch((error) => {
    console.log(`Error connecting to database: ${error}`);
})

//Define Schemas
const movieSchema = new mongoose.Schema({
    
}) 

const Movie = mongoose.model('Movie', movieSchema);

app.get('/', (req, res) => {
    try {
        res.send('<p>Welcome to MovieJaMMer!</p>');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});



app.listen(PORT, () => {
    try {
        console.log(`Connected to server on PORT: ${PORT}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});
