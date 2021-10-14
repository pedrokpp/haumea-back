const jwt = require("jsonwebtoken");
const fs = require("fs");
const expiredTokens = require("../models/expiredTokens");

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: "1s" });
}

function isTokenValid(token) {
    const fToken = await expiredTokens.findOne({ token: token });

    if (fToken) return false;

    try {
        jwt.verify(token, process.env.JWT_TOKEN);
    } catch {
        const newExpiredToken = new expiredTokens({
            token: token,
        });
        newExpiredToken.save();
        return false;
    }
    return true;
}

module.exports = { generateAccessToken, isTokenValid };
