const Router = require('koa-router')
const fs = require('fs')
const path = require('path')


const router = new Router ({
    prefix: '/allinone'
})

/**
 * 扫描目录，挂载路由
 */
 const addRoutes = (routesUrl) => {
    // 同步方法无所谓的，因为是在服务器跑起来之前就完成映射，不会有任何性能影响
    const routesDir = fs.readdirSync(routesUrl)
    console.log(routesDir)
    routesDir.forEach((filename) => {
      const file = path.join(routesUrl, '/' + filename)
      if (fs.lstatSync(file).isDirectory()) {
        const tdir = path.join(routesUrl, filename)
        addRoutes(tdir)
        return
      }
      const routerModel = require(path.join(routesUrl, filename))
      router.use(routerModel.routes(), routerModel.allowedMethods())
    })
  }
  
  const routePath = path.join(__dirname, '../../router')
  addRoutes(routePath)

router.get('/', (ctx) => {
    ctx.body = 'Hello  Allinone'
})

module.exports = router