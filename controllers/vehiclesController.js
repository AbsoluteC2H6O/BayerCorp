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
        const response ={
          status: 200,
          res: result,
          error: false
        }
        res.json(response);
      }else{
        console.log(err);
        res.render('404', { title: `There are not vehicles in the database with that ID = ${id}` });
      }
  });
};

// SERVICIO 4 = Reporte de control filtrado por vehiculo
// Get ingreso for plate
const vehicle_details_plate = (req, res) => {
  const { plate } = req.params;
  const sql = `SELECT *FROM Ingreso WHERE Placa = '${plate}'`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      const response ={
        status: 200,
        res: result,
        error: false
      }
      res.json(response);
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with that plate = ${plate} is not in the database.` });
    }
  });
};

// SERVICIO 5 = Reporte de control filtrado por vivienda
// Get ingreso for house
const vehicle_details_house = (req, res) => {
  const { idVivienda } = req.params;
  const sql = `SELECT *FROM Ingreso WHERE idVivienda = '${idVivienda}'`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      const response ={
        status: 200,
        res: result,
        error: false
      }
      res.json(response);
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with that idVivienda = ${idVivienda} is not in the database.` });
    }
  });
};

// SERVICIO 6 = Reporte de control filtrado por tipo de vehiculo (propietario o visitante)
// Get ingreso for idAuto
const vehicle_details_auto = (req, res) => {
  const { n } = req.params;
  if(n == 0)
  {
    const sql = `SELECT *FROM Ingreso WHERE idAuto IS NOT NULL`;
    Vehicle.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        const response ={
          status: 200,
          message: 'Vehicles owners',
          res: result,
          error: false
        }
        res.json(response);
      }else{
        const response ={
          status: 400,
          message: 'Vehicles owners not database',
          res: result,
          error: false
        }
        res.json(response);
      }
    });
  }else if(n == 1){
    const sql1 = `SELECT *FROM Ingreso WHERE idAuto IS NULL`;
    Vehicle.query(sql1, (err, result) => {
      if (err) throw err;
      if (result.length > 0){
        const response ={
          status: 200,
          message: 'Vehicles visitans',
          res: result,
          error: false
        }
        res.json(response);
      }else{
        const response ={
          status: 400,
          message: 'Vehicles visitans not database',
          res: result,
          error: false
        }
        res.json(response);
      }
    });
  }else{
    res.render('404', { title: `Option incorrect.` });
  }
};

// SERVICIO 2 = Reporte de control de acceso en rango de fecha
// Search Ingreso for range date
const vehicle_range_date = (req, res) => {
  const { Fecha1, Fecha2 } = req.body;
  console.log(Fecha1, Fecha2);
  const sql = `SELECT *FROM Ingreso WHERE Fecha_y_hora >= '${Fecha1}' AND Fecha_y_hora <= '${Fecha2}'`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      const response ={
        status: 200,
        message: `Vehicle found in date range ${Fecha1} and ${Fecha2}.`,
        result: result,
        error: false,
      }
      res.json(response);
      //res.render('index', { title: 'Encontrado autos propietarios' });
    }else{
      console.log(err);
      res.render('404', { title: `Vehicle with that range ${Fecha1} and ${Fecha2} is not in the database.` });
    }
  });
};

// SERVICIO 3 = Reporte de control últimos ingresos
// Search Ingreso for ultimate registration
const vehicle_latest_registration = (req, res) => {
  const { n } = req.params;
  const sql = `SELECT *FROM Ingreso`;
  Vehicle.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      if(n > result.length){
        const response ={
          status: 200,
          message: `There is not ${n} registers orders in the database.`,
          error: false,
        }
        res.json(response);
      }else{
        let lastVehicles = result.slice(result.length-n);
        const response ={
          status: 200,
          message: `Vehicle found in the last range n = ${n}`,
          result: lastVehicles,
          error: false,
        }
        res.json(response);
      }
    }else{
      console.log(err);
      res.render('404', { title: `There is not registers in the database` });
    }
  });
};

// Create new vehicle form
const vehicle_create_get = (req, res) => {
  res.render('create', { title: 'Create a new vehicle registration.' });
  //res.redirect('/index');
};

// SERVICIO 1 = Registrar un ingreso vehicular
// Create a new Ingreso
const vehicle_create_post = (req, res) => {
  const { Placa } = req.body;
  const sql = `SELECT COUNT(*) AS namesCount FROM Auto WHERE Placa = '${Placa}'`;
  Vehicle.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows[0].namesCount > 0){
      const sql1 = `SELECT *FROM Auto WHERE Placa = '${Placa}'`;
      Vehicle.query(sql1, (err, result1) => {
        if (err) throw err;
        if (result1.length > 0){
          const sql2 = `SELECT * FROM Auto_Vivienda WHERE Auto_idAuto = ${result1[0].idAuto}`;
          Vehicle.query(sql2, (err, result2) => {
            if (err) throw err;
            if(result2.length > 0){
              const sql = 'INSERT INTO Ingreso SET ?';
              const vehiclesObj = {
                IdIngreso: req.body.IdIngreso,
                Fecha_y_hora: req.body.Fecha_y_hora,
                Comentario: req.body.Comentario,
                idVivienda: result2[0].Vivienda_idVivienda,
                idAuto: result1[0].idAuto,
                Placa: req.body.Placa,
                Color: result1[0].Color
              };
              Vehicle.query(sql, vehiclesObj, err => {
                if (err) throw err;
                const response ={
                    status: 200,
                    res: `Vehicle with plate = ${vehiclesObj.Placa} created successful!`,
                    error: false,
                }
                res.json(response);
              });
            }
          });
        }
      });
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
  vehicle_range_date,
  vehicle_latest_registration,
  vehicle_create_get,
  vehicle_create_post,
  vehicle_update_id,
  vehicle_delete_id
}