const express = require('express')
const mongoose = require('mongoose')
const model = require('./model')
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function start() {
  try {
    const db = await mongoose.connect(
      'mongodb+srv://verachill:a3ypZHbHebkeaSR9@cluster0.rylzj.mongodb.net/Test?retryWrites=true&w=majority'
    )
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start().then(() => {
  app.post('/api', async (req, res) => {
    const data = new model(req.body)
    await data
      .save()
      .then((data) => {
        res.send({
          id: data._id,
          amount: data.amount,
        })
      })
      .catch((err) => {
        console.log(`An error occurred while saving data. Error: ${err}`)
      })
  })

  app.get('/api', async (req, res) => {
    await model.find({}).then((data) => res.send(data))
  })
})

// start().then(() => {
//   app.get('/api', async (request, response) => {
//     const entries = await model.find({}).then((req, res) => JSON.stringify(req))
//     console.log(entries)
//   })
