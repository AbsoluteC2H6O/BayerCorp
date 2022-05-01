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
router.get('/idAuto/:n', vehicleController.vehicle_details_auto);
//router.get('/', vehicleController.vehicle_create_get);
router.get('/range/', vehicleController.vehicle_range_date);
router.get('/latest/:n', vehicleController.vehicle_latest_registration);
router.post('/create', vehicleController.vehicle_create_post);
router.put('/update/', vehicleController.vehicle_update_id);
router.delete('/delete/:plate', vehicleController.vehicle_delete_id);

module.exports = router;