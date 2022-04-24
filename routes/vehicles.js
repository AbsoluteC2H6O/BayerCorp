// Controller
const vehicleController = require('../controllers/vehiclesController');
// Express
const express = require('express');
// Express-Router
const router = express.Router();

router.get('/allvehicles', vehicleController.vehicle_index);
router.get('/:id', vehicleController.vehicle_details_id);
router.get('/:plate', vehicleController.vehicle_details_plate);
router.get('/create', vehicleController.vehicle_create_get);
router.post('/', vehicleController.vehicle_create_post);
router.put('/', vehicleController.vehicle_update_id);
router.delete('/:id', vehicleController.vehicle_delete_id);
router.delete('/:plate', vehicleController.vehicle_delete_plate);

module.exports = router;