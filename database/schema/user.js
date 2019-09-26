const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcryptjs')
const SALT_WORLD_FACTOR = 10

const userSchema = new Schema({
    userId: ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLogin: {type: Date, default: Date.now()}
}) // 加盐

userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORLD_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err)
            this.password = hash
            next()
        })

    })
})

// 发布模型
mongoose.model('User', userSchema)