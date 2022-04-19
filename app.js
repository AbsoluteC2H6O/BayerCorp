const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MYSQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alf24-LD21@#',
    database: 'testing2'
});


// Check connect

connection.connect(error =>{
    if (error) throw error;
    console.log('Database server connected and running well!')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

