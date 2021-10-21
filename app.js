// noinspection JSCheckFunctionSignatures

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const recordRoutes = require('./routes/record')
const recordTypeRoutes = require('./routes/recordType')

const keys = require('./config/keys')

const app = express()

mongoose
	.connect(keys.mongoURI)
	.then(() => {
		console.log('MongoDB connected')
	})
	.catch(error => {
		console.log(`Error: ${error}`)
	})

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/record', recordRoutes)
app.use('/api/v1/record-type', recordTypeRoutes)

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'It is working!',
	})
})

module.exports = app
