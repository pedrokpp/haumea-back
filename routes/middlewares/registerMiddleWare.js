const User = require("../../models/user");
const jwt = require("../../jwt/jwt");

async function registerMiddleware(req, res, next) {
    let user = {};

    if (!req.body.username || !req.body.password)
        return res.status(400).send("body incompleto");

    try {
        user = await User.findOne({ username: req.body.username });
        if (user) return res.status(400).send("usuário já existente");
    } catch {
        return res.status(500).send("erro interno");
    }

    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        userLevel: 0,
    });

    try {
        await user.save();
        const token = jwt.generateAccessToken({
            username: user.username,
            userLevel: user.userLevel,
        });
        return res.status(201).json({ token: token });
    } catch {
        return res.status(500).send("erro interno");
    }
}

module.exports = registerMiddleware;
