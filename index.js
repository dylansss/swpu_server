const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')
let user = require('./appApi/user.js')
app.use(bodyParser())
// 装载子路由

let router = new Router()
router.use('/user',user.routes())

app.use(router.routes())
app.use(router.allowedMethods())
app.use(cors())
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        
        ctx.response.status = 200
        
        console.log(ctx);
      ctx.body = 200; 
    } else {
      await next();
    }
  });
// ;(async () => {
//     await connect()
//     initSchemas()
//     const User = mongoose.model('User')
//     let oneUser = new User({userName: 'syzpass', password: '123456'})
//     oneUser.save().then(() => {
//         console.log('success');
//     })
//     let user = await User.find({}).exec()
//     console.log(user,'用户信息');
    
// })()
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');