const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: '7d' })
}

module.exports = { generateAccessToken }