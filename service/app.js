const Koa = require('koa')
const config = require('./config/config')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const router = require('./src/middleWare/Router/index')
const serve = require('koa-static')
const cors = require('koa-cors')
const logger = require('koa-logger')
const db = require('./utils/mongoose').db
const people = require('./models/peoplesSchema')
const app = new Koa()
const port = config.port || '8080'
// middleWare

// try-catch 中间件
app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.response.body !== undefined) {
      if (Array.isArray(ctx.response.body)) {
        ctx.response.body = {
          code: 200, msg: "success", result: ctx.response.body
        }
      } else if (ctx.response.body instanceof Object) {
        ctx.response.body.code = ctx.response.body.code || 200
        ctx.response.body.msg = ctx.response.body.msg || "success"
      }
    }
  } catch (err) {
    console.log("捕获到了异常",`路由为${ctx.originalUrl}-------->${err.message}`)
    // 系统内自定义异常
    ctx.response.status = 200
    ctx.response.body = {
      code: err.code || 500,
      msg: err.message,
      isSuccess: false
    }
  }
})

// app.use(async (ctx, next) => {
//   ctx.params = ctx.request.body.fields
//   await next()
// })

// http请求解析中间件
app.use(koaBody())

// 路由中间件
app.use(router.routes(), router.allowedMethods())

// koa static server
const server = app.listen(port,() => {
  console.log('【 Service 】 starting on port ' + port)
})

db.connect()
// var People = new people({
//   _id: '123445',
//   deleted: false,
//   birthday: new Date(),
//   createTime: new Date()
// });
setTimeout(() => {
  // People.save((err,res) => {
  //   if(err) {
  //     console.log(' save error ',err)
  //   } else {
  //     console.log(res)
  //   }
  // })
},5000)
module.exports = app