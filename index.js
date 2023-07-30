const moongoseConnection=require('./db.js');
const express = require('express');
const cors = require('cors')

moongoseConnection();

const app = express()
 
app.use(cors())

const port = 5000

app.use(express.json());
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

