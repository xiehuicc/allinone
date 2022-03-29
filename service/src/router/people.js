const peopleController = require('../controllers/PeopleController')

const Router = require('koa-router')
const router = new Router({
    prefix: '/people'
})

router.get('/findOne', async(ctx) => {
    ctx.body = await peopleController.findOne(ctx.query)
})

module.exports = router