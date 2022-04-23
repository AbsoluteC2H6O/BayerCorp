const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const {NULL} = require('mysql/lib/protocol/constants/types');
const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

// MySQL
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
        res:'¡Welcome to my API - BayerCorp!',
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
                res: 'Sorry, there is not vehicles in the DB.',
                error: true,
        
            }
            res.json(response);
        }
    });
});
// // Get vehicle for id
// app.get('/vehicles/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
//     connection.query(sql, (err, results) => {
//         if (err) throw err;
//         if (results.length > 0){
//             const response ={
//                 status: 200,
//                 res: results,
//                 error: false,
//             }
//             res.json(response);
//         }else{
//             const response ={
//                 status: 502,
//                 res:`There is not vehicles in the DB  with id: ${id}`,
//                 error: true,
        
//             }
//             res.json(response);
//         }
//     });
// });
// Get vehicle for plate
app.get('/vehicles/:plate', (req, res) => {
    const {plate} = req.params;
    const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
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
                res: `Vehicle with plate ${plate} is not in the database`,
                error: true,
            }
            res.json(response)
        }
    });
});
// Create new vehicle
app.post('/addVehicle', (req, res) => {
    const { plate } = req.body;
    console.log('plate', plate)
    const sql = `SELECT *FROM Vehicles WHERE plate='${plate}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0){
            const response ={
                status: 502,
                res: `Vehicle with plate ${req.body.plate} is already created in the data`,
                error: true,
            }
            res.json(response);
        }else{
            const sql = 'INSERT INTO Vehicles SET ?';
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
        }
    });
});

// update a vehicle
app.put('/updateVehicles/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length === 1){
            const sql = 'UPDATE Vehicles SET ? WHERE cod = ?';
            connection.query(sql, [req.body, id], (err) => {
            if (err) throw err;
            const response ={
                status: 200,
                res: `Vehicle with cod ${id} updated successful`,
                error: false,
            }
            res.json(response)
        });
        }else{
            const response ={
                status: 502,
                res: `Vehicle with cod ${id} not updated!`,
                error: true,
            }
            res.json(response);
        }
});
});

//delete a vehicle by cod
// app.delete('/deleteVehicle/:id', (req, res) => {
//     const {id} = req.params;
//     const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
//     connection.query(sql, (err, results) => {
//         if (err) throw error;
//         if (results.length > 0){
//             const sql = `DELETE FROM Vehicles WHERE cod = ${id}`;
//             connection.query(sql, err => {
//                 if (err) throw error;
//                 const response ={
//                     status: 200,
//                     res: `Vehicle with cod ${id} deleted successful`,
//                     error: false,
            
//                 }
//                 res.json(response)
//             });
//         }else{
//             const response ={
//                 status: 502,
//                 res: `Vehicle with plate ${plate} is not in the data.`,
//                 error: true,
//             }
//             res.json(response);
//         }
//     });
// });

// Delete a vehicle by plate
app.delete('/deleteVehicle/:plate', (req, res) => {
    const {plate} = req.params;
    const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0){
            const sql = `DELETE FROM Vehicles WHERE plate = '${plate}'`;
            connection.query(sql, err => {
                if (err) throw error;
                const response ={
                    status: 200,
                    res: `Vehicle with cod ${plate} deleted successful`,
                    error: false,
            
                }
                res.json(response)
            });
        }else{
            const response ={
                status: 502,
                res: `Vehicle with plate ${plate} is not in the data.`,
                error: true,
            }
            res.json(response);
        }
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