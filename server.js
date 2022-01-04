//require('dotenv').config({ path: __dirname + '/.env.development.local' })
require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const bodyParser = require('body-parser')
const clientsRoute = require('./src/api/routes/clients')
const cors = require('cors');

const app = express()


app.use(cors()) //enabling  all Cross-Origin Resource Sharing = CORS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/clients', clientsRoute);

app.listen(process.env.PORT || 3000);