const Koa = require('koa')
const config = require('./config/config')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const cors = require('koa-cors')
const logger = require('koa-logger')

const app = new Koa()
const port = config.port || '8080'
// middleWare

// koa static server
const server = app.listen(port,() => {
    console.log('Service is start on port ' + port)
})
