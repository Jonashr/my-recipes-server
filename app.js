const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const recipeRouter = require('./controllers/recipes')
const db = require('./db')

app.use(morgan('dev'))
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/recipes', recipeRouter)

module.exports = app