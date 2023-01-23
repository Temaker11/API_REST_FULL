require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const person = require('./models/Person')

//forma deler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
// Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)
// entregar uma porta 


const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.u3qyog3.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
  .catch((err) => console.log(err))


  