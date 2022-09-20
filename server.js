// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
require('dotenv').config()
// SEQUELIZE CONNECTION
// SEQUELIZE CONNECTION
const sequelize = new Sequelize({
    storage: process.env.PG_URI,
    dialect: 'postgres',
    username: 'postgres',
    password: '8542453'
})

// CONTROLLERS 
const bandsController = require('./controllers/band_controller')
app.use('/bands', bandsController)
const eventsController = require('./controllers/events_controller')
app.use('/events', eventsController)
const stagesController = require('./controllers/stages_controller')
app.use('/stages', stagesController)





// CONFIGURATION / MIDDLEWARE

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})


// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})