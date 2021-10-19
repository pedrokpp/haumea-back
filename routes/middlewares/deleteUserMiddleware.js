const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function deleteUserMiddleware(req, res, next) {
    if (!req.body.username || !req.body.password)
        return res.status(400).send("body incompleto");

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).send("username inexistente");
        req.body.user = user;
        next();
    } catch {
        return res.status(500).send("erro interno");
    }
}

module.exports = deleteUserMiddleware;
