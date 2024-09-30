const express = require('express')
const app = express()
const env = require('dotenv').config()

const PORT = process.env.PORT

app.get('/', (req, res) => {
    try {
        res.send('<p>Welcome to MovieJaMMer!</p>')
    } catch (error) {
        console.log(`Error: ${error}`)
    }
})





app.listen(PORT, () => {
    try {
        console.log(`Connected to server on PORT: ${PORT}`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
})
