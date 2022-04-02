const Koa = require('koa')
const config = require('./config/config')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const router = require('./src/middleWare/Router/index')
const serve = require('koa-static')
const cors = require('koa-cors')
const db = require('./utils/mongoose').db
const app = new Koa()
const port = config.port || '8080'


const Logger = require('./src/middleWare/Logger/index')
const BusinessError = require('../service/utils/error')
global.BusinessError = BusinessError


// middleWare

//koa 解决跨域
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

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
    console.log("捕获到了异常",`路由为${ctx.request.url}-------->${err.message}`)
    // 系统内自定义异常
    ctx.response.status = 200
    ctx.response.body = {
      code: err.code || 500,
      msg: err.message,
      isSuccess: false
    }
    return ctx.response.body
  }
})
app.use(cors())
// app.use(async (ctx, next) => {
//   ctx.params = ctx.request.body.fields
//   await next()
// })

// http请求解析中间件
app.use(koaBody())

// log4js 日志中间件
app.use(Logger.intercept())

// 路由中间件
app.use(router.routes(), router.allowedMethods())


// koa static server
const server = app.listen(port,() => {
  console.log('【 Service 】 starting on port ' + port)
})

db.connect()
module.exports = app