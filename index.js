const moongoseConnection=require('./db.js');
const express = require('express');


moongoseConnection();


const app = express()
const port = 27017

app.get('/', (req, res) => {
  res.send('Hello Wasif!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

