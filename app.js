const path = require('path');
//
var PORT = process.env.PORT || 3000 ;
const express = require('express');
const bodyParser = require('body-parser');
//
// inports
const loginRoutes = require('./routes/login');
const db = require('./util/database');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
/*
db.execute('SELECT * FROM registered_user ')
.then(result=> {
    console.log(result[0],result[1]);
})
.catch( err =>{
    console.log(err);
});
*/
app.use(loginRoutes);

app.listen(PORT);
