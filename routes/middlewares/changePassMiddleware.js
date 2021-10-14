const User = require("../../models/user");

async function changePassMiddleware(req, res, next) {
    if (!req.body.username || !req.body.password || !req.body.newPassword)
        return res.status(400).send("body incompleto");

    const user = await User.findOne({ username: req.body.username });

    if (!(await bcrypt.compare(req.body.password, user.password)))
        return res.status(401).send("senha inválida");

    next();
}

module.exports = changePassMiddleware;