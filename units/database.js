const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'eu-cdbr-west-03.cleardb.net',
    user :'b81dd870c779dc',
    database:'heroku_809879640b9cbc4',
    password: '7a8a865a'

})

module.exports = pool.promise();