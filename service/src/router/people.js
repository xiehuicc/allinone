const peopleController = require('../controllers/peopleController')
const Router = require('koa-router')
const router = new Router({
    prefix: '/people'
})

// 新增人员
router.post('/add', async(ctx) => {
    ctx.body = await peopleController.add(ctx.request.body,ctx)
})

// 查询单个人员数据
router.get('/findOne', async(ctx) => {
    ctx.body = await peopleController.findOne(ctx.query)
})

module.exports = router