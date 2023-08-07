const connectTOmongo=require('./db');
const express = require('express')
connectTOmongo();

var cors= require('cors');

const app = express()
const port = 5000
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})