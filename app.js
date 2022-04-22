const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

// MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'elarabe1616',
    database: 'testing2'
});

// ROUTES
app.get('/', (req, res) => {
    res.send('¡Welcome to my API - BayerCorp!');
});

// All vehicles

// Get all vehicles
app.get('/vehicles', (req, res) => {
    const sql = 'SELECT * FROM Vehicles';
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            res.json(results);
        }else{
            res.send('Sorry, there is not vehicles in the DB.');
        }
    });
    // res.send('List of vehicles');
});

// Get vehicle for id
app.get('/vehicleID/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            res.json(results);
        }else{
            res.send(`Vehicle with ID ${id} is not in the data.`);
        }
    });
});

// Get vehicle for plate
app.get('/vehiclePlate/:plate', (req, res) => {
    const {plate} = req.params;
    const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            res.json(results);
        }else{
            res.send(`Vehicle with plate ${plate} is not in the data.`);
        }
    });
});

// Create new vehicle
app.post('/addVehicle', (req, res) => {
    const {plate} = req.body.plate;
    const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;

    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length == 0){
            const sql = 'INSERT INTO Vehicles SET ?';
            const vehiclesObj = {
                name: req.body.name,
                plate: req.body.plate,
                color:req.body.color,
                cod: req.body.cod
            };
            connection.query(sql, vehiclesObj, err => {
                if (err) throw err;
                res.send(`Vehicle with plate ${vehiclesObj.plate} created successful!`);
        });
        }else{
            
        }
    });
});

// Update a vehicle
app.put('/updateVehicles/:id', (req, res) => {
    const {id} = req.params;
    const {name, plate, cod, color} = req.body;
    const sql = `UPDATE Vehicles SET name = '${name}', plate = '${plate}', color = '${color}'
    WHERE cod = ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        res.send(`Vehicle with plate ${plate} updated successful!`);
    });
});

// Delete a vehicle by cod
app.delete('/deleteVehicleCod/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;

    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length == 1){
            const sql = `DELETE FROM Vehicles WHERE cod = ${id}`;
            connection.query(sql, err => {
                if (err) throw error;
                res.send(`Vehicle with cod ${id} deleted successful!`);
            });
        }else{
            res.send(`Vehicle with cod ${id} is not in the data.`);
        }
    });
});

// Delete a vehicle by plate
app.delete('/deleteVehiclePlate/:plate', (req, res) => {
    const {plate} = req.params;
    const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;

    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length == 1){
            const sql = `DELETE FROM Vehicles WHERE plate = '${plate}'`;
            connection.query(sql, err => {
                if (err) throw error;
                res.send(`Vehicle with plate ${plate} deleted successful!`);
            });
        }else{
            res.send(`Vehicle with plate ${plate} is not in the data.`);
        }
    });
});

// Check connect
connection.connect(error =>{
    if (error) throw error;
    console.log('Database server connected and running well!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});