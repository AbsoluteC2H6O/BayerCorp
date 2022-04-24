const Vehicle = require('../models/vehicle');

// Get all vehicles
const vehicle_index = (req, res) => {
  const sql = 'SELECT * FROM Vehicles';
  Vehicle.query(sql, (err, result) => {
      if (err) throw error;
      if (result.length > 0){
        res.render('details', { vehicle: result, title: `Vehicle list` });
      }else{
        console.log(err);
        res.render('404', { title: 'Sorry, there is not vehicles in the database.' });
      }
  });
};

//  Get vehicle for id
const vehicle_details_id = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
  Vehicle.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        res.render('details', { vehicle: result, title: `Vehicle Details for ID = ${id}` });
      }else{
          console.log(err);
          res.render('404', { title: `There is not vehicles in the database with id: ${id}` });
      }
  });
}

// Get vehicle for plate
const vehicle_details_plate = (req, res) => {
  const { plate } = req.params;
  const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      res.render('details', { vehicle: result, title: `Vehicle Details for plate = ${plate}` });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with plate ${plate} is not in the database.` });
        }
  });
};

// Create new vehicle form
const vehicle_create_get = (req, res) => {
  res.render('create', { title: 'Create a new vehicle registration' });
}

// Create a new vehicle registration
const vehicle_create_post = (req, res) => {
  const { plate } = req.body;
  const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;

  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      res.render('404', { title: `Vehicle with plate ${plate} is already created in the database.` });
    }else{
      const sql = 'INSERT INTO Vehicles SET ?';
      const vehiclesObj = {
        name: req.body.name,
        plate: req.body.plate,
        color: req.body.color,
        cod: req.body.cod
      };
      connection.query(sql, vehiclesObj, err => {
        if (err) throw err;
        const response ={
            status: 200,
            res: `Vehicle with plate ${vehiclesObj.plate} created successful!`,
            error: false,
        }
        res.json(response);
        res.json({ redirect: '/index' });
      });
    }
  });
};
/* const vehicle_create_post = (req, res) => {
  const vehicle = new Vehicle(req.body);
  vehicle.save()
    .then(result => {
      res.redirect('/vehicle');
    })
    .catch(err => {
      console.log(err);
    });
} */

// Update vehicle registration by ID
const vehicle_update_id = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw error;
    if (results.length === 1){
      const sql = 'UPDATE Vehicles SET ? WHERE cod = ?';
      connection.query(sql, [req.body, id], (err) => {
      if (err) throw err;
      const response ={
          status: 200,
          res: `Vehicle with plate = ${plate} updated successful!`,
          error: false,
      }
      res.json(response);
      res.json({ redirect: '/index' });
    });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with plate = ${plate} not updated, is already created in the database.` });
    }
  });
};

// Delete a vehicle by ID
const vehicle_delete_id = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT *FROM Vehicles WHERE cod = ${id}`;

  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      const sql = `DELETE FROM Vehicles WHERE cod = '${id}'`;
      Vehicle.query(sql, err => {
        if (err) throw err;
        const response ={
          status: 200,
          res: `Vehicle with ID = ${id} deleted successful!`,
          error: false,
        }
        res.json(response);
        res.json({ redirect: '/index' });
      });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with ID = ${id} is not in the database.` });
    }
  });
};

// Delete a vehicle by plate
const vehicle_delete_plate = (req, res) => {
  const { plate } = req.params;
  const sql = `SELECT *FROM Vehicles WHERE plate = '${plate}'`;

  Vehicle.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0){
      const sql = `DELETE FROM Vehicles WHERE plate = '${plate}'`;
      Vehicle.query(sql, err => {
        if (err) throw err;
        const response ={
          status: 200,
          res: `Vehicle with plate = ${plate} deleted successful!`,
          error: false,
        }
        res.json(response);
        res.json({ redirect: '/index' });
      });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with plate = ${plate} is not in the database.` });
    }
  });
};

module.exports = {
  vehicle_index, 
  vehicle_details_id,
  vehicle_details_plate, 
  vehicle_create_get, 
  vehicle_create_post,
  vehicle_update_id,
  vehicle_delete_id,
  vehicle_delete_plate
}