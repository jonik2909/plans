const express = require('express');
const app = express();

// MONGODB CONNECT
const db = require('./server').db();
const mongodb = require('mongodb');

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

app.post('/delete-item', (req, res) => {
    const id = req.body.id;
    db.collection('plans').deleteOne({_id: new mongodb.ObjectId(id)}, (err,data) => {
        res.json({state: 'success'})
    })
})

app.post('/edit-item', (req, res) => {
    const data = req.body;
    db.collection('plans').findOneAndUpdate({_id: new mongodb.ObjectId(data.id)}, 
    {$set : { reja: data.new_reja }}, (err,data) => {
        res.json({state: "success"})
    })
})

app.post('/delete-all', (req, res) => {
    if (req.body.delete_all) {
        db.collection('plans').deleteMany(() => {
            res.json({state: 'success'});
        })
    }
})



 


module.exports = app;