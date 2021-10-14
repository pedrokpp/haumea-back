const User = require("../../models/user");
const jwt = require("../../jwt/jwt");

async function registerMiddleware(req, res, next) {
    let user = {};

    if (!req.body.username || !req.body.password)
        return res.status(400).send("body incompleto");

    // if (req.cookies.session && !jwt.isTokenValid(req.cookies.session)) return res.status(403).send('token inválido, crie uma nova sessão')

    if (req.body.username.length > 16)
        return res.status(400).send("username muito grande");
    if (req.body.username.lengt < 3)
        return res.status(400).send("username muito pequeno");
    if (req.body.username.match("^[a-zA-Z0-9_]*$") == null)
        return res.status(400).send("username contém caracteres inválidos");

    try {
        user = await User.findOne({ username: req.body.username });
        if (user) return res.status(400).send("usuário já existente");
    } catch {
        return res.status(500).send("erro interno");
    }
    next();
}

module.exports = registerMiddleware;
