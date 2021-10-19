const jwt = require("../../jwt/jwt");

async function validateTokenMiddleware(req, res, next) {
    if (!req.body.token) return res.status(400).send("body incompleto");

    if (await jwt.isTokenValid(req.body.token))
        return res.status(200).send("token válido");
    return res.status(404).send("token inválido");
}

module.exports = validateTokenMiddleware;
