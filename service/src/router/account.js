
const accountController = require('../controllers/accountController')

const Router = require('koa-router')
const router = new Router({
    prefix: '/account'
})

router.post('/login', async(ctx) => {
    ctx.body = await accountController.login(ctx.request.body)
})

router.post('/add', async(ctx) => {
    ctx.body = await accountController.add(ctx.request.body)
})




module.exports = router