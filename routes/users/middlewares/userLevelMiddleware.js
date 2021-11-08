const User = require("../../../models/user");

module.exports = async (req, res, next) => {
    let user = {};

    if (!req.body.userLevel) return res.status(400).send("body incompleto")

    try {
        await User.updateOne(
            { username: req.params.username },
            { userLevel: req.body.userLevel }
        );
        user = await User.findOne({ username: req.params.username });
        return res.status(200).json(user);
    } catch {
        return res.status(500).send("erro interno");
    }
};
