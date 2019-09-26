const Router = require('koa-router')
let router = new Router()
router.get('/', async(ctx) => {
    console.log('访问到了这里');
    ctx.request.header = 'Access-Control-Allow-Origin'
    ctx.body = '首页'
})

// router.options('/register',async(ctx) => {
//     ctx.body = 1111

// })
router.post('/register',async(ctx) => {
    console.log(ctx.request.body.userName, '接收到了数据');
    console.log(JSON.stringify(ctx.request.body), '接收到了数据');
    ctx.body = ` ${JSON.stringify(ctx.request.body)}`
})

module.exports = router