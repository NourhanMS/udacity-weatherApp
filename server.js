// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const listening = () => console.log(`App listening on port ${port}!`);
app.listen(port, listening);

//Get request returns projectData object
app.get('/data', (req, res) => {
    res.send(projectData);
})

//Post request to save to data
app.post('/addData',(req,res) => {
    projectData.tempretaure =  req.body.tempretaure;
    projectData.date =  req.body.date;
    projectData.userResponse =  req.body.userResponse;
    res.send(projectData);
})
