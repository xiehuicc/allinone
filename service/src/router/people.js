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

router.post('/find',async(ctx) => {
    ctx.body = await peopleController.find(ctx.request.body)
})

// 分页查询
router.get('/pageQuery', async (ctx) => {
    ctx.body = await peopleController.pageQuery(ctx.query)
})

// 同步三方人员
router.post('/pullPeople', async (ctx) => {
    await peopleController.pullPeople(ctx.request.body)
})
module.exports = router