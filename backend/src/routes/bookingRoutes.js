const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

const bookingValidation = [
  body('flightId').isString().notEmpty(),
  body('passengerName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('seatNumber').isString().trim().notEmpty(),
  body('phoneNumber').matches(/^\+?[\d\s-]+$/).withMessage('Invalid phone number')
];

router.post('/', validate(bookingValidation), bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBooking);
router.delete('/:id', bookingController.cancelBooking);

module.exports = router; 