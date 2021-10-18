const mongoose = require("mongoose");
const express = require("express");
<<<<<<< HEAD
const cookieParser = require("cookie-parser");
const cors = require("cors");
=======
const cookieParser = require('cookie-parser');
const cors = require('cors')
>>>>>>> dev
const app = express();
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("dbs error: " + error));
db.once("open", () => console.log("dbs conectada"));

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(cors());

app.use("/users", require("./routes/users"));

app.listen(3000, () => console.log("api listening at port 3000"));
