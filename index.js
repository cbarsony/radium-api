const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
var axios = require("axios").default

const app = express()
const port = 3001

app.use(express.json())
app.use(bodyParser.json())

if(process.env.AUTH0_MANAGEMENT_TOKEN) {
  var auth0Options = {
    method: 'GET',
    url: 'https://radium.eu.auth0.com/api/v2/users',
    params: {q: 'email: *radium*', search_engine: 'v3'},
    headers: {authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`}
  };
  
  axios.request(auth0Options).then(function (response) {
    console.log('auth0 users', response.data);
  }).catch(function (error) {
    console.error(error);
  });
}
else {
  console.log('No AUTH0_MANAGEMENT_TOKEN is given in .env. See README.md.')
}

app.get('/api/hello', (req, res) => {
  console.log('hello', req.body)
  res.json({message: 'hello majom'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
