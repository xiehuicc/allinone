const Router = require('koa-router')
const yzjController = require('../thirdpart/controllers/yzjController')
const router = new Router({
  prefix: '/thirdpart'
})


router.post('/getAccessToken', async (ctx) => {
  ctx.body = await yzjController.getAccessToken(ctx.request.body)
})

router.post('/getAllPeople', async (ctx) => {
  ctx.body = await yzjController.getAllPeople(ctx.request.body)
})

module.exports = router