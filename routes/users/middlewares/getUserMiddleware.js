const User = require("../../../models/user");

module.exports = async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(200).send("-1");
    return res.status(200).send(user.userLevel.toString());
};
