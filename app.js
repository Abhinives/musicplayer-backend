const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const user = require('./routes/loginroutes');

const app  = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/musicplayer', user);
const connectToDb = async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/music')
    console.log('Connected');
}
connectToDb();
const PORT= 3000;

app.listen(PORT,()=>{
    console.log('Listening');
})