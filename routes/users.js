const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/expiredTokens");
const jwt = require("../jwt/jwt");
const router = express.Router();

router.post("/login", require("./middlewares/loginMiddleware"));

router.post("/register", require("./middlewares/registerMiddleWare"));

router.patch("/change-password", require("./middlewares/changePassMiddleware"));

router.post("/logout", require("./middlewares/logoutMiddleware"));

router.post(
    "/validate-token",
    require("./middlewares/validateTokenMiddleware")
);

router.get("/:username", async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).send("username não encontrado");
    return res.status(200).send(user.userLevel.toString());
});

router.delete(
    "/delete-account",
    require("./middlewares/deleteUserMiddleware"),
    // TODO delete-account endpoint
    async (req, res) => {
        if (!(await bcrypt.compare(req.body.password, req.body.user.password)))
            return res.status(401).send("senha inválida");
    }
);

router.patch(
    "/:username",
    require("./middlewares/checkAdminKey"),
    require("./middlewares/userLevelMiddleware")
);

module.exports = router;
