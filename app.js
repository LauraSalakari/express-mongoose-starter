require('dotenv').config();
const express = require('express');
const app = express();
var hbs = require('hbs');
const logger = require('morgan'); // morgan logs more details about the requests being made!
const PORT = process.env.PORT;

//ensure database is connected
require('./config/db.config');

// Register your template engine
// NOTE: 'view engine' is a keyword here. 
// 'hbs' is the extension from which it recongnizes those are template engines
app.set('view engine', 'hbs');

// Register your views to let express know where all the hbs files exist
// NOTE: 'views' is a keyword here.  
// Whenever we specify any path in `res.render` ,
// it will look in that directory that we have set the views as. 
// In our case `__dirname + '/views'`
app.set('views', __dirname + '/views');

// Set up the middleware to make the files inside the public folder
// available throughout the app
app.use(express.static(__dirname + '/public'));


// require the body-parser library to get requests in a manageable form 
// this is included with node.js! no need to install separately
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//Allows us to see detailed logs in the console
app.use(logger('dev')); //morgan set up in the middleware! now we see extra logs in the console 

//Register partials if needed
//hbs.registerPartials(__dirname + '/views/partials');


// Routes here

// we tell the middleware where to find our routes
const todoRoutes = require("./routes/Todo.routes");

app.use("/", todoRoutes);


//Start the server to begin listening on a port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});