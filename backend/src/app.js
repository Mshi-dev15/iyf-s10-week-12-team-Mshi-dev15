const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api', require('./routes'))
module.exports = app
