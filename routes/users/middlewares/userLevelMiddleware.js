const User = require("../../../models/user");

module.exports = async (req, res, next) => {
    let user = {};

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
