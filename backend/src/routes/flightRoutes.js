const express = require('express');
const { body, query } = require('express-validator');
const validate = require('../middleware/validate');
const flightController = require('../controllers/flightController');

const router = express.Router();

// Validation schemas
const searchValidation = [
  query('from').optional().isString().trim(),
  query('to').optional().isString().trim(),
  query('date').optional().isISO8601().toDate()
];

const flightValidation = [
  body('flightNumber').isString().trim().notEmpty(),
  body('from').isString().trim().notEmpty(),
  body('to').isString().trim().notEmpty(),
  body('departureTime').isISO8601().toDate(),
  body('arrivalTime').isISO8601().toDate(),
  body('price').isFloat({ min: 0 }),
  body('seats').isInt({ min: 0 })
];

// Routes
router.get('/', validate(searchValidation), flightController.searchFlights);
router.get('/:id', flightController.getFlight);
router.post('/', validate(flightValidation), flightController.createFlight);
router.put('/:id', validate(flightValidation), flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

module.exports = router; 