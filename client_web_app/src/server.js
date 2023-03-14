const express = require('express')

//--- Servicios Express
const expressSession = require('express-session')
const { Server: HttpServer } = require('http')
//const { Server: Socket } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
//const io = new Socket(httpServer)

//--- Routes
//const productRouter = require('../routes/productRouter')
//const sessionRouter = require('../routes/sessionRouter')
//const infoRouter = require('../routes/infoRouter')

//--- Objetos locales
// const { drone } = require('../class/droneContainer')

//--- Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
/*app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: process.env.MONGOCREDENTIALSESSION,
      mongoOptions: advancedOptions
    }),
  secret: 'secret-pin',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))*/

//--- ROUTES
//--- SESSION ROUTER 
//app.use('/session', sessionRouter)

//--- API REST ROUTER 
//app.use('/api', productRouter)

//--- INFO ROUTER
//app.use('/info', infoRouter)

let PORT = 8080 

server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => logger.error(`Error en servidor ${error}`))