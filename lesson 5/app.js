const express = require("express")
const app = express()

app.set('view engine', 'ejs')

app.use('/', require('./routes/articles'))

app.listen(8080)
