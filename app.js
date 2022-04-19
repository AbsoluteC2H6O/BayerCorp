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

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});
// all vehicles

// Get all vehicles
app.get('/vehicles', (req, res) => {
    const sql = 'SELECT * FROM Vehicles';
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            res.json(results);
        }else{
            res.send('There is not vehicles in the DB')
        }
    })
    // res.send('List of vehicles');
});

// Get all vehicles
app.get('/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            res.json(results);
        }else{
            res.send(`There is not vehicles in the DB  with id: ${id}`)
        }
    })
});
// Create new vehicle
app.post('/addVehicle', (req, res) => {
    const sql = 'INSERT INTO Vehicles SET ?'
    const vehiclesObj = {
        name: req.body.name,
        plate: req.body.plate,
        color:req.body.color,
        cod: req.body.cod
    };

    connection.query(sql, vehiclesObj, err => {
        if (err) throw err;
        res.send(`Vehicle with plate ${vehiclesObj.plate} created successful`)
    })
});

// update a vehicle
app.put('/updateVehicles/:id', (req, res) => {
    const { id } = req.params
    const {name, plate, cod, color} = req.body;
    const sql = `UPDATE Vehicles SET name = '${name}', plate = '${plate}', color = '${color}'
    WHERE cod = ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        res.send(`Vehicle with plate ${plate} updated successful`)
    })
});

//delete a vehicle
app.delete('/deleteVehicle/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Vehicles WHERE cod= ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        res.send(`Vehicle with cod ${id} deleted successful`)
    })
});
// Check connect

connection.connect(error =>{
    if (error) throw error;
    console.log('Database server connected and running well!')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

