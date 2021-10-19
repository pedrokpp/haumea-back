const User = require("../../models/user");
const jwt = require("../../jwt/jwt");
const bcrypt = require("bcrypt");

async function loginMiddleware(req, res, next) {
    let user = {};

    if (!req.body.username || !req.body.password)
        return res.status(400).send("body incompleto");

    try {
        user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send("usuário não existe");
    } catch {
        return res.status(500).send("erro interno");
    }

    if (!(await bcrypt.compare(req.body.password, user.password)))
        return res.status(401).send("senha inválida");

    const token = jwt.generateAccessToken({
        username: user.username,
        userLevel: user.userLevel,
    });

    return res.status(200).json({ token: token });
}

module.exports = loginMiddleware;
