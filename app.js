const express = require('express');
const morgan = require('morgan');
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');
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

app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
    //try{
    res.send('Hello World');
    // }
    // catch(err){
    //     throw err;
    // }
})

app.get('/', (req, res, next) => {
    res.redirect('/wiki');
})

app.listen(3000);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
})

syncUp();