const jwt = require('jsonwebtoken')
const fs = require('fs')

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: '7d' })
}

function isTokenValid(token) {
    let expiredTokens = fs.readFileSync('./expired-tokens.txt', { encoding: 'utf-8' }).trim().split("\n")
    if (expiredTokens.includes(token)) return false
    
    let value = jwt.verify(token, process.env.JWT_TOKEN)

    if (value == null) {
        fs.appendFileSync('./expired-tokens.txt', `${token}\n`)
        return false
    }
    
    return true
}

module.exports = { generateAccessToken, isTokenValid }