// A WEB APPLICATION FOR DEMONSTRATING DOCKER CONTAINERS
// =============================================================

// LIBRARIES
// ---------

// EXTERNAL LIBRARIES
// ------------------
const express = require('express');
const {engine} = require('express-handlebars');

// Library for handling .env variables
const dotenv =  require('dotenv')

// Local libraries and modules
// ---------------------------

// A module to demonstrate local dependency to be included ion the container
const dbOperations = require('./dbOperations');

// INITIALIZATION
// --------------

// Create an express app
const app = express();

// Initialize .env to access variables
dotenv.config();

// Define a TCP port to listen: read env or use 8080 if undefined
const PORT = process.env.APP_CONTAINER_PORT || 8080

// Set a folders for static files like css, images or icons
app.use(express.static('public'));
app.use('/images', express.static('public/images'));

// Setup templating
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Setup URL parser to use extended option
app.use(express.urlencoded({extended: true}))

// URL ROUTES
// ----------

// Route to home page
app.get('/', (req, res) => {
    res.render('home')
});

// A test route to tiedot page using dynamic data
app.get('/tiedot', (req, res) => {

    // Call funtion getContainerData from module dbOpeations
    // It returns a promise so you need then to wait resutlset
    dbOperations.getContainerData().then((resultset) =>{

        // Render the page and give a key to the resultset to be
        // used in handlebars code
        res.render('tiedot', {containerData: resultset.rows});
    })
});

// SERVER START
// ------------
app.listen(PORT)
console.log(`Server started on port ${PORT}`)
// var environment = process.env
// console.log(environment)