const { Router } = require('express')
const clientCommandController = require('../controllers/clientCommandController')
const clientCommandRoute = Router()

// POST Long command
clientCommandRoute.post(
  '/',
  (req, res) => {
    clientCommandController.longCommand(req, res)
  })

module.exports = clientCommandRoute
