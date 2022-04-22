// Express and MYSQL integrations
const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
// RUN on PORT 3050
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
    const response ={
        status: 200,
        res:'Welcome to my API',
        error: false,

    }
    res.json(response);
});
// Get all vehicles
app.get('/vehicles', (req, res) => {
    const sql = 'SELECT * FROM Vehicles';
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            const response ={
                status: 200,
                res: results,
                error: false,
        
            }
            res.json(response);
        }else{
            const response ={
                status: 502,
                res: 'There is not vehicles in the DB',
                error: true,
        
            }
            res.json(response);
        }
    });
});
// Get all vehicles
app.get('/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            const response ={
                status: 200,
                res: results,
                error: false,
        
            }
            res.json(response);
        }else{
            const response ={
                status: 502,
                res:`There is not vehicles in the DB  with id: ${id}`,
                error: true,
        
            }
            res.json(response);
        }
    });
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
        const response ={
            status: 200,
            res: `Vehicle with plate ${vehiclesObj.plate} created successful`,
            error: false,
    
        }
        res.json(response)
    });
});
// update a vehicle
app.put('/updateVehicles/:id', (req, res) => {
    const { id } = req.params
    const {name, plate, cod, color} = req.body;
    const sql = `UPDATE Vehicles SET name = '${name}', plate = '${plate}', color = '${color}'
    WHERE cod = ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        const response ={
            status: 200,
            res: `Vehicle with plate ${plate} updated successful`,
            error: false,
    
        }
        res.json(response)
    });
});
//delete a vehicle
app.delete('/deleteVehicle/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Vehicles WHERE cod= ${id}`;
    connection.query(sql, err => {
        if (err) throw err;
        const response ={
            status: 200,
            res: `Vehicle with cod ${id} deleted successful`,
            error: false,
    
        }
        res.json(response)
    });
});
// Check connect
connection.connect(error =>{
    if (error) throw error;
    console.log('Database server connected and running well!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

