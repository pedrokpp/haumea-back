const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("../jwt/jwt");
const router = express.Router();

router.post(
    "/login",
    require("./middlewares/loginMiddleware"),
    async (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };

        if (!(await bcrypt.compare(req.body.password, req.body.user.password)))
            return res.status(401).send("senha inválida");

<<<<<<< HEAD
        res.cookie(
            "session",
            jwt.generateAccessToken({
                username: req.body.user.username,
                userLevel: req.body.user.userLevel,
            }),
            { maxAge: 604800000, httpOnly: false }
        );
=======
        const token = jwt.generateAccessToken({
            username: req.body.user.username,
            userLevel: req.body.user.userLevel,
        });
>>>>>>> dev

        return res.status(200).json({ token: token });
    }
);

router.post(
    "/register",
    require("./middlewares/registerMiddleWare"),
    async (req, res) => {
        const user = new User({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10),
            userLevel: 0,
        });

        try {
            await user.save();
<<<<<<< HEAD
            res.cookie(
                "session",
                jwt.generateAccessToken({
                    username: user.username,
                    userLevel: user.userLevel,
                }),
                { maxAge: 604800000, httpOnly: false }
            );
            return res.status(201).send("usuário criado");
=======
            const token = jwt.generateAccessToken({
                username: user.username,
                userLevel: user.userLevel,
            });
            return res.status(201).json({ token: token });
>>>>>>> dev
        } catch {
            return res.status(500).send("erro interno");
        }
    }
);

router.patch(
    "/change-password",
    require("./middlewares/changePassMiddleware"),
    async (req, res) => {
        try {
            await User.updateOne(
                { username: req.body.username },
                { password: await bcrypt.hash(req.body.newPassword, 10) }
            );
            return res.status(200).send("senha alterada");
        } catch {
            return res.status(500).send("erro interno");
        }
    }
);

// router.delete("/delete-account")

router.patch(
    "/:username",
    require("./middlewares/checkAdminKey"),
    async (req, res) => {
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
    }
);

module.exports = router;
