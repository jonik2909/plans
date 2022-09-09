const express = require('express');
const app = express();

// MONGODB CONNECT
const db = require('./server').db();

// 1: Introduce code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 2: Session code
// 3: Views code
app.set('views', 'views');
app.set('view engine', 'ejs');

// 4: Router code
app.get("/", (req, res) => {
    res.send("SERVER STARTED")
});


module.exports = app;