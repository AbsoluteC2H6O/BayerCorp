// Controller
const vehicleController = require('../controllers/vehiclesController');
// Express
const express = require('express');
// Express-Router
const router = express.Router();

router.get('/', vehicleController.vehicle_index);
router.get('/allvehicles', vehicleController.vehicle_all_vehicles);
router.get('/id/:id', vehicleController.vehicle_details_id);
router.get('/plate/:plate', vehicleController.vehicle_details_plate);
router.get('/idVivienda/:idVivienda', vehicleController.vehicle_details_house);
router.get('/idAuto/', vehicleController.vehicle_details_auto);
router.get('/create', vehicleController.vehicle_create_get);
router.post('/', vehicleController.vehicle_create_post);
router.put('/update/', vehicleController.vehicle_update_id);
router.delete('/delete/:plate', vehicleController.vehicle_delete_id);

/*  1.- Registrar un ingreso vehicular
    2.- Reporte de control de acceso en rango de fecha;
    3.- Reporte de los ultimos n accesos
    4.- Reporte de control filtrado por vehiculo (medio listo)
    5.- Reporte de control filtrado por vivienda (medio listo)
    6.- Reporte de control si es vecino o visitante (idAuto o no) */

module.exports = router;