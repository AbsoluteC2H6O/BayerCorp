const Vehicle = require('../models/vehicle');

// Menu
const vehicle_index = (req, res) => {
  res.render('vehicles', { title: 'Menú' });
};

// Get all ingresos
const vehicle_all_vehicles = (req, res) => {
  const sql = 'SELECT * FROM Ingreso';
  Vehicle.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        const response ={
          status: 200,
          res: result,
          error: false,
      }
      res.json(response);
      //res.render('details', { vehicle: result, title: `Vehicle list` });
      res.render('vehicles', { title: 'Menu' });
      }else{
        const response ={
          status: 502,
          res: 'Sorry, there is not vehicles in the database.',
          error: true,
        }
        res.json(response);
        console.log(err);
        res.render('404', { title: 'Sorry, there is not vehicles in the database.' });
      }
  });
};

//  Get ingreso for id
const vehicle_details_id = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT *FROM Ingreso WHERE idIngreso = ${id}`;
  Vehicle.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        //res.render('index', { vehicle: result, title: `Vehicle Details for ID = ${id}` });
        res.json(result);
        res.render('index', { title: 'Encontrado' });
      }else{
        console.log(err);
        res.render('404', { title: `There are not vehicles in the database with that ID = ${id}` });
      }
  });
};

// Get ingreso for plate
const vehicle_details_plate = (req, res) => {
  const { plate } = req.params;
  const sql = `SELECT *FROM Ingreso WHERE Placa = '${plate}'`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      //res.render('details', { vehicle: result, title: `Vehicle Details for plate = ${plate}` });
      res.json(result);
      res.render('index', { title: 'Encontrado' });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with that plate = ${plate} is not in the database.` });
    }
  });
};

// Get ingreso for house
const vehicle_details_house = (req, res) => {
  const { idVivienda } = req.params;
  const sql = `SELECT *FROM Ingreso WHERE idVivienda = '${idVivienda}'`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      res.json(result);
      res.render('index', { title: 'Encontrado' });
      //res.render('details', { vehicle: result, title: `Vehicle Details for idVivienda = ${idVivienda}` });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with that idVivienda = ${idVivienda} is not in the database.` });
    }
  });
};

// Get ingreso for idAuto
const vehicle_details_auto = (req, res) => {
  const sql = `SELECT *FROM Ingreso WHERE idAuto IS NOT NULL`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      res.json(result);
      res.render('index', { title: 'Encontrado autos propietarios' });
      //res.render('details', { vehicle: result, title: `Vehicle Details for idAuto is not NULL` });
    }else{
      res.json(result);
      res.render('index', { title: 'Encontrado autos visitantes' });
    }
  });
};

// Create new vehicle form
const vehicle_create_get = (req, res) => {
  res.render('create', { title: 'Create a new vehicle registration.' });
  //res.redirect('/index');
};

// Create a new registration
const vehicle_create_post = (req, res) => {
  const { plate } = req.body;
  const sql = `SELECT *FROM Auto WHERE Placa = '${plate}'`;

  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      const response ={
        status: 200,
        res: `Vehicle with plate = ${vehiclesObj.Placa} is owner!`,
        error: false,
      }
      /* FALTA OBTENER LOS CAMPOS Y LLENARLOS EN EL OBJETO DE LA TABLA INGRESO*/
      //res.render('404', { title: `Vehicle with plate ${plate} is already created in the database.` });
    }else{
      const sql = 'INSERT INTO Ingreso SET ?';
      const vehiclesObj = {
        IdIngreso: req.body.IdIngreso,
        Fecha_y_hora: req.body.Fecha_y_hora,
        Comentario: req.body.Comentario,
        idVivienda: req.body.idVivienda,
        idAuto: req.body.idAuto,
        Placa: req.body.Placa,
        Color: req.body.Color
      };
      Vehicle.query(sql, vehiclesObj, err => {
        if (err) throw err;
        const response ={
            status: 200,
            res: `Vehicle with plate = ${vehiclesObj.Placa} created successful!`,
            error: false,
        }
        res.json(response);
        res.json({ redirect: '/index' });
      });
    }
  });
};

// SERVICIO 8 = Actualizar el comentario del ingreso de un vehículo en su ID Ingreso
// Update registration by ID
const vehicle_update_id = (req, res) => {
  const { idIngreso, Comentario } = req.body;
  const sql = `SELECT *FROM Ingreso WHERE idIngreso = ${idIngreso}`;
  Vehicle.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 1){
      const sql = `UPDATE Ingreso SET Comentario = '${Comentario}' WHERE idIngreso = ${idIngreso}`;
      Vehicle.query(sql, (err, result) => {
      //Vehicle.query(sql, [req.body, id], (err) => {
      if (err) throw err;
      if(sql)
      {
        const response ={
            status: 200,
            res: `Registration with ID = ${idIngreso} updated successful!`,
            error: false,
        }
        res.json(response);
      }else{
        console.log(err);
        res.render('404', { title: `Vehicle is not in the database.` });  
      }
    });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with ID Acess = ${idIngreso} not updated, is already created in the database.` });
    }
  });
};

// SERVICIO 7 - Eliminar los ingresos de un vehículo por su placa
// Delete a vehicle by plate
const vehicle_delete_id = (req, res) => {
  const { plate } = req.params;
  const sql = `SELECT *FROM Ingreso WHERE Placa = '${plate}'`;
  console.log('Placa', req.params);
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    console.log('select', sql);
    if (result.length > 0){
      const sql = `DELETE FROM Ingreso WHERE Placa = '${plate}'`;
      Vehicle.query(sql, err => {
        if (err) throw err;
        console.log('delete', sql);
        const response ={
          status: 200,
          res: `Vehicle with plate = ${plate} deleted successful!`,
          error: false,
        }
        res.json(response);
      });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with Placa = ${plate} is not in the database.` });
    }
  });
};

module.exports = {
  vehicle_index,
  vehicle_all_vehicles,
  vehicle_details_id,
  vehicle_details_plate,
  vehicle_details_house,
  vehicle_details_auto,
  vehicle_create_get,
  vehicle_create_post,
  vehicle_update_id,
  vehicle_delete_id
}