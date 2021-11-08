const jwt = require("jsonwebtoken");
const expiredTokens = require("../models/expiredTokens");

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: "10s" }); // aumentar tempo para produção
}

async function isTokenValid(token) {
    const fToken = await expiredTokens.findOne({ token: token });

    if (fToken) return false;

    try {
        jwt.verify(token, process.env.JWT_TOKEN);
        return true;
    } catch {
        const newExpiredToken = new expiredTokens({
            token: token,
        });
        newExpiredToken.save();
        return false;
    }
}

module.exports = { generateAccessToken, isTokenValid };
