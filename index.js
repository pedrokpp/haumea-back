const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = 3001;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("dbs error: " + error));
db.once("open", () => console.log("dbs conectada"));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", require("./routes/users/users"));

app.listen(port, () => console.log("api listening at port " + port));
