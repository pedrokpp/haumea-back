const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const requiredNumber = {
    type: Number,
    required: true
}

const userSchema = new mongoose.Schema({
    username: requiredString,
    password: requiredString,
    userLevel: requiredNumber,
    token: {
        type: String,
        required: true,
        default: "aaa"
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleTimeString('pt-br')
    }
})

module.exports = mongoose.model('user', userSchema)