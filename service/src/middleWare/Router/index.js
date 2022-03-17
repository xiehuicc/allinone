const Router = require('koa-router')
const fs = require('fs')
const path = 'path'


const router = new Router ({
    prefix: '/allinone'
})

router.get('/', (ctx) => {
    ctx.body = 'Hello  Allinone'
})

module.exports = router