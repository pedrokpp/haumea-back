const User = require("../../../models/user");
const expiredTokens = require("../../../models/expiredTokens");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.newPassword)
        return res.status(400).send("body incompleto");

    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(403).send("acesso bloqueado");

    if (!(await bcrypt.compare(req.body.password, user.password)))
        return res.status(401).send("senha inválida");

    // TODO invalidar token

    try {
        await User.updateOne(
            { username: req.body.username },
            { password: await bcrypt.hash(req.body.newPassword, 10) }
        );
        return res.status(200).send("senha alterada");
    } catch {
        return res.status(500).send("erro interno");
    }
};
