const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleTimeString("pt-br"),
    },
});

module.exports = mongoose.model("expired-tokens", tokenSchema);
