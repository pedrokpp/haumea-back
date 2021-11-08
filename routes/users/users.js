const express = require("express");
const router = express.Router();

router.post("/login", require("./middlewares/loginMiddleware"));

router.post("/register", require("./middlewares/registerMiddleWare"));

router.patch("/change-password", require("./middlewares/changePassMiddleware"));

router.post("/logout", require("./middlewares/logoutMiddleware"));

router.post(
    "/validate-token",
    require("./middlewares/validateTokenMiddleware")
);

router.get("/:username", require("./middlewares/getUserMiddleware")); // retorna apenas o userLevel do usuário

router.delete("/delete-account", require("./middlewares/deleteUserMiddleware"));

router.patch(
    "/:username",
    require("./middlewares/checkAdminKey"),
    require("./middlewares/userLevelMiddleware")
);

module.exports = router;
