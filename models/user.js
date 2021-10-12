const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userLevel: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleTimeString('pt-br')
    }
})

module.exports = mongoose.model('user', userSchema)