//-------------- Minimist
const parseArgs = require('minimist')(process.argv.slice(2)) // ejemplo -> nodemon src/main.js -p 8080 -i 192.123.12.1
const config = {
  port: parseArgs.p, // puerto escucha
  ipaddress: parseArgs.i, // ip de drone
}


module.exports = config