const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require('../models/user')

router.post('/login', loginMiddleware, async (req, res) => {
    const user = { username: req.body.username, password: req.body.password }
    if (!(await bcrypt.compare(req.body.password, req.body.user.password))) {
        return res.status(401).send('senha inválida')
    } else {
        return res.status(200).send('logado com sucesso')
    }
})

router.post('/register', registerMiddleware, async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        userLevel: 0
    })

    try {
        const newUser = await user.save()
        return res.status(201).send('usuário criado')
    } catch {
        return res.status(500).send('erro interno')
    }

})

router.patch('/:username', checkAdminKey, (req, res) => {
    
})

async function loginMiddleware(req, res, next) {
    let user = {}
    
    if (!req.body.username || !req.body.password) return res.status(400).send('body incompleto')

    try {
        user = await User.findOne({ "username": req.body.username })
        if (!user) return res.status(400).send('usuário não existe')
    } catch {
        return res.status(500).send('erro interno')
    }
    req.body.user = user
    next()
}

async function registerMiddleware(req, res, next) {
    let user = {}

    if (!req.body.username || !req.body.password) return res.status(400).send('body incompleto')

    if (req.body.username.length > 16) return res.status(400).send('username muito grande')
    if (req.body.username.lengt < 3) return res.status(400).send('username muito pequeno')
    if (req.body.username.match("^[a-zA-Z0-9_]*$") == null) return res.status(400).send('username contém caracteres inválidos')

    try {
        user = await User.findOne({ "username": req.body.username })
        if (user) return res.status(400).send('usuário já existente')
    } catch {
        return res.status(500).send('erro interno')
    }
    next()
}

function checkAdminKey(req, res, next) {
    if (req.body.auth !== process.env.ADMIN_KEY) return res.status(401).send("acesso não autorizado")
    next()
}

module.exports = router