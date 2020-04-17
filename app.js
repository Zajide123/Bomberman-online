const path = require('path');
var PORT = process.env.PORT || 3000 ;
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./units/database');
const app = express();

/*
db.execute('SELECT * FROM registered_user ')
.then(result=> {
    console.log(result[0],result[1]);
})
.catch( err =>{
    console.log(err);
});
*/


app.listen(PORT);
