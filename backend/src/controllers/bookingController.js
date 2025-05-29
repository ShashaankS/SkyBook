const { supabase } = require('../config/supabase');
const { logger } = require('../utils/logger');

const createBooking = async (req, res, next) => {
  try {
    // Check if flight exists and has available seats
    const { data: flight, error: flightError } = await supabase
      .from('flights')
      .select('*')
      .eq('id', req.body.flightId)
      .single();

    if (flightError) throw flightError;
    if (!flight) {
      return res.status(404).json({
        status: 'error',
        message: 'Flight not found'
      });
    }

    if (flight.seats <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No seats available'
      });
    }

    // Create booking and update flight seats in a transaction
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        ...req.body,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Update flight seats
    const { error: updateError } = await supabase
      .from('flights')
      .update({ seats: flight.seats - 1 })
      .eq('id', req.body.flightId);

    if (updateError) throw updateError;

    logger.info('New booking created', { bookingId: data.id });
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        flight:flights(*)
      `);

    if (error) throw error;
    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        flight:flights(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Get booking details first
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (bookingError) throw bookingError;
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
    }

    // Delete booking
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // Increase available seats
    const { error: updateError } = await supabase
      .from('flights')
      .update({ seats: supabase.raw('seats + 1') })
      .eq('id', booking.flightId);

    if (updateError) throw updateError;

    logger.info('Booking cancelled', { bookingId: id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking
}; 