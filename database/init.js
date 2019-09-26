const mongoose = require('mongoose')
const db = "mongodb://localhost/test_db"
const glob = require('glob')
const {resolve} = require('path')


exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {

    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {


        // 链接数据库
        mongoose.connect(db)
    
        // 增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            console.log('数据库断开');
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                throw new Error('数据库断开链接')
            }
        })
        mongoose.connection.on('error', () => {
            console.log('数据库出错');
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                throw new Error('数据库出现错误')
            }
        })
        mongoose.connection.once('open', () => {
            console.log('Mongo DB 链接成功');
            // mongoose.connect(db)
            resolve()
        })
    })
}