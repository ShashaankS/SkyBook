const { supabase } = require('../config/supabase');
const { logger } = require('../utils/logger');

const searchFlights = async (req, res, next) => {
  try {
    const { from, to, date } = req.query;
    let query = supabase.from('flights').select('*');

    if (from) query = query.eq('from', from);
    if (to) query = query.eq('to', to);
    if (date) {
      const searchDate = new Date(date).toISOString().split('T')[0];
      query = query.gte('departureTime', `${searchDate}T00:00:00`)
                   .lte('departureTime', `${searchDate}T23:59:59`);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const getFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Flight not found'
      });
    }

    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const createFlight = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('flights')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    logger.info('New flight created', { flightId: data.id });
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const updateFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('flights')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Flight not found'
      });
    }

    logger.info('Flight updated', { flightId: id });
    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('flights')
      .delete()
      .eq('id', id);

    if (error) throw error;

    logger.info('Flight deleted', { flightId: id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight
}; 