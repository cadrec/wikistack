const express = require('express');
const morgan = require('morgan');
const { db, Page, User } = require('./models');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/stylesheets'));
app.use(express.urlencoded({extended: false}));

const syncUp = async () =>{
    try{
        await db.sync({force: true});
        console.log("Sync");
    }
    catch{
        throw new Error;
    }
}


app.get('/', (req, res) => {
    //try{
    res.send('Hello World');
    // }
    // catch(err){
    //     throw err;
    // }
})

app.listen(3000);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
})

syncUp();