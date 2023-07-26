const express = require('express')
const { Router } = express   
const droneRouter = Router() 

const config = require('../config/environment')


// ------------ Get drone status
droneRouter.get(
  '/status',
  async (req, res) => {
    await fetch(`http://${config.ipaddress}:8000/pix`, {
    })
    .then(resoponse => resoponse.json())
    .then(data => {
      res.status(200).send(data)
    })
  }
)


// ----------- Get thermal image
droneRouter.get(
  '/thermalimage',
  async (req, res) => {
    await fetch(`http://${config.ipaddress}:8000/thermal`, {
    })
    .then(resoponse => resoponse.json())
    .then(data => {
      res.status(200).send(data)
    })
  }
)



// ---------- Get camera image


// --------- Post recive drone comm parameters


// --------- Post commands






module.exports = droneRouter