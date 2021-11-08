const User = require("../../../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.token)
        return res.status(400).send("body incompleto");

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).send("username inexistente");
        if (!(await bcrypt.compare(req.body.password, user.password)))
            return res.status(401).send("senha inválida");
        await user.remove();
        const newExpiredToken = new Token({
            token: req.body.token,
        });
        await newExpiredToken.save();
        return res.status(200).send("usuário deletado");
    } catch {
        return res.status(500).send("erro interno");
    }
};
