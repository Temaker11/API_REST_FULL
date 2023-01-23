// config inicial 
const express = require('express')
const mongoose =require('mongoose')
const app = express()

const Person = require('./models/Person')

//forma deler JSON / middlewares
app.use(
  express.urlencoded({
    extetended: true,
  })
)

app.use(express.json())
// Rotas da API
app.post('/person', async (req, res) => {

  // {name: "Temaker11", salary: 5000, approved: false}
  const {name, salary, approved} = req.body

  const person = {
    name,
    salary,
    approved
  }

  //create
  try {

    await Person.create(person)

    res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})

  } catch (error) {
    res.status(500).json({error: error})
  }

})

//rota inicial / endpoint
app.get('/', (req, res) => {

  // mostrar req

  res.json({message: 'Oi Express!'})
})


// entregar uma porta 

mongoose
  .connect(
    'mongodb+srv://Temaker11:2xBgMGjJ2o0wQjGC@apicluster.w4jyqog.mongodb.net/bancodaapi?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
  .catch((err) => console.log(err))
