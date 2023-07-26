const express = require('express')
const treblle = require('@treblle/express') // Creates API documentation

const { staticFiles, port, treblleApiKey, treblleProjectId } = require('./config/environment')
const clientComandRoute = require('./routes/clientCommandRoute')
// const usersRoute = require('./routes/usersRoute')

const app = express()

// ---------------------- MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/doc', express.static(staticFiles))
app.use(
  treblle({
    apiKey: treblleApiKey,
    projectId: treblleProjectId
  }))

// ---------------------- ROUTES
app.use('/client', clientComandRoute)

// ---------------------- START SERVER
app.listen(port, () => {
  console.log(`Listening in: http://localhost:${port}`)
})
