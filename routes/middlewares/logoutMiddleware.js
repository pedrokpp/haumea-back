async function logoutMiddleware(req, res, next) {
    if (!req.body.token) return res.status(400).send("body incompleto");
    const newExpiredToken = new Token({
        token: req.body.token,
    });
    await newExpiredToken.save();
    return res.status(200).send("token invalidado");
}

module.exports = logoutMiddleware;
