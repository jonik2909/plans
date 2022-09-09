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
   db.collection('plans').find().toArray((err, data) => {
    if (err) {
        console.log(err);
        res.end('something went wrong!')
    } else {
        res.render('reja', {items: data})
    }
   })
});

app.post('/create-item', (req, res) => {
    const new_reja = req.body.reja;
    db.collection('plans').insertOne({reja: new_reja}, (err, data) => {
        res.json(data.ops[0]);
    })
})



 


module.exports = app;