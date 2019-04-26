const express = require('express');
const bodyParser = require('body-parser');
const passport=require('passport');
var path=require('path')
const session=require('express-session')

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());
// parse application/json
app.use(bodyParser.json())

///////hashing password
app.use(session({

    secret:'thesecret',
    saveUninitialized:false,
    resave:false

}))

/////////////////////////////////////
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": ""});
});

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");

});
