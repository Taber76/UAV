const express = require('express')

//--- Servicios Express
const { Server: HttpServer } = require('http')
const app = express()
const httpServer = new HttpServer(app)

 //--- Routes
 const droneRouter = require('../routes/droneRouter')

//--- Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


//--- ROUTES
app.use('/drone', droneRouter)

let PORT = 8080 

server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => logger.error(`Error en servidor ${error}`))