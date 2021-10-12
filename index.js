const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', error => console.error("dbs error: " + error))
db.once('open', () => console.log("dbs conectada"))

app.use(express.json())

app.use('/users', require('./routes/users'))

app.listen(3000, () => console.log("api listening at port 3000"))