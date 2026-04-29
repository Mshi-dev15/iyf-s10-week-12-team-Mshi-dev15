const express = require('express')
const router = express.Router()
const KENYA_COUNTIES = require('../config/counties')
const { ApiError } = require('../middleware/errorHandler')

router.get('/counties', (req, res) => {
  res.json({
    success: true,
    data: KENYA_COUNTIES.map(c => ({
      name: c.name,
      code: c.code,
      capital: c.capital,
      towns: c.towns
    }))
  })
})

router.get('/counties/:county/towns', (req, res) => {
  const county = KENYA_COUNTIES.find(
    c => c.name.toLowerCase() === req.params.county.toLowerCase()
  )
  if (!county) throw new ApiError('County not found', 404, 'NOT_FOUND')
  res.json({ success: true, data: county.towns })
})

module.exports = router