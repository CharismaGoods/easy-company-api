//require('dotenv').config({ path: __dirname + '/.env.development.local' })
require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const bodyParser = require('body-parser')
const clientsRoute = require('./src/api/routes/clients.route')
const categoriesRoute = require('./src/api/routes/categories.route')
const productsRoute = require('./src/api/routes/products.route')
//const priceCategoriesRoute = require('./src/api/routes/priceCategories')
const cors = require('cors');

const app = express()


app.use(cors()) //enabling  all Cross-Origin Resource Sharing = CORS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/clients', clientsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/products', productsRoute);
//app.use('/api/price_categories', priceCategoriesRoute);


app.listen(process.env.PORT || 3000);