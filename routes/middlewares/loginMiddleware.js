const User = require('../../models/user')
const jwt = require('../../jwt/jwt')

async function loginMiddleware(req, res, next) {
    let user = {}
    
    if (!req.body.username || !req.body.password) return res.status(400).send('body incompleto')

    // if (req.cookies.session && !jwt.isTokenValid(req.cookies.session)) return res.status(403).send('token inválido, crie uma nova sessão')

    try {
        user = await User.findOne({ "username": req.body.username })
        if (!user) return res.status(400).send('usuário não existe')
    } catch {
        return res.status(500).send('erro interno')
    }
    req.body.user = user
    next()
}

module.exports = loginMiddleware