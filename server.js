const http = require('http');
const mongodb = require('mongodb')
const dotenv = require('dotenv').config();

const connection_string = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.timky.mongodb.net/Reja?retryWrites=true&w=majority`

mongodb.connect(connection_string, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, 
    (err, client) => {
    if (err) console.log('MongoDB connection error!');
    else {
        console.log('MongoDB connection succeed');
        module.exports = client;

        const app  = require('./app');
        const server = http.createServer(app);
        const PORT = 7007;
        server.listen(PORT, () => {
            console.log(`Server is running successfully on port: http://localhost:${PORT}`);
        })
    }
})