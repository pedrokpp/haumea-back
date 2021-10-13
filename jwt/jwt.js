const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: '7d' })
}

module.exports = { generateAccessToken }