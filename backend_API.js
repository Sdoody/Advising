const express = require('express');
//const fileUpload = require('express-fileupload'); We probaly wont ever use this, but if we do its here 
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addCollegePage, addCollege, deleteCollege, editCollege, editCollegePage} = require('./routes/College');

//port the sever will be listing on port 8080 
//*****KEEP IN MIND IF PORT IS IN USE THIS MUST BE CHANGED TO AN UNSED PORT********
const port = 8081; 

//create the connection to the database 

const db = mysql.createConnection({
    host: 'localhost',      //host of the database 
    user:  'root',          //username of database 
    password: 'Ginger100',  //password for the database 
    database: 'cs492s19'    //name of database
});

//connecting to the database 

db.connect((err) => {
    if (err) {
        throw err; 
    }
    console.log("Connected to the database!")
});

global.db = db;


//configure the middleware 
app.set('port', process.env.port || port); // set express to use this port 
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view 
app.set('view engine', 'ejs'); // configture template engine 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json()); //parse data from client
app.use(express.static(path.join(__dirname, 'public'))); //configure express to use public folder
//app.use(fileUpload()); //configure fileupload 

//routes for the app 
app.get('/', getHomePage);
app.get('/add', addCollegePage);
app.get('/edit/:id', editCollegePage);
app.get('/delete/:id', deleteCollege);
app.post('/add', addCollege);
app.post('/edit/:id', editCollege);

// set the app to listen on the port 
app.listen(port, () =>{
    console.log('Sever is running on port: ' + port);
});