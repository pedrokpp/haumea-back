const User = require("../../../models/user");
const jwt = require("../../../jwt/jwt");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    if (!req.body.username || !req.body.password)
        return res.status(400).send("body incompleto");

    if (
        req.body.username.length > 16 ||
        req.body.username.lengt < 3 ||
        req.body.username.match("^[a-zA-Z0-9_]*$") == null
    )
        return res.status(400).send("nome de usuário inválido"); // manter check para segurança contra exploits

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send("usuário não existe");
        
        if (!(await bcrypt.compare(req.body.password, user.password)))
            return res.status(401).send("senha inválida");

        const token = jwt.generateAccessToken({
            username: user.username,
            userLevel: user.userLevel,
        });

        return res.status(200).json({ token: token });
    } catch {
        return res.status(500).send("erro interno");
    }
};
