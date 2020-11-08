const mongoose = require('mongoose');
const express = require ('express');
const server = express();
var hostname = '127.0.0.1';
var port = '8080';
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const mongoAtlas = process.env.MONGO_URI;


server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', indexRouter);

mongoose.connect(mongoAtlas,{ useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error',function(error){
    console.log('connection error');
});
db.once('open',function(){
    console.log('database connected');
});


server.listen(port,hostname,(err)=>{
    if(err) {
        console.log(`Mike, Sth went wrong**`);
        console.log(err)
    };
    console.log(`Server running at http://${hostname}:${port}/`);
})