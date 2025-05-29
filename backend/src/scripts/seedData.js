require('dotenv').config();
const { supabase } = require('../config/supabase');
const { logger } = require('../utils/logger');

// Map city names to their airport codes for lookup
const cityAirportMap = {
  'Delhi': 'DEL',
  'Mumbai': 'BOM',
  'Bengaluru': 'BLR',
  'Hyderabad': 'HYD',
  'Chennai': 'MAA',
  'Kolkata': 'CCU',
  'Ahmedabad': 'AMD',
  'Goa': 'GOI',
  'Pune': 'PNQ',
  'Jaipur': 'JAI'
};

const sampleFlights = [
  {
    flightNumber: 'AI201',
    from: 'Delhi',
    to: 'Mumbai',
    departureTime: '2024-06-05T06:00:00Z',
    arrivalTime: '2024-06-05T08:10:00Z',
    price: 4499.00,
    seatClass: 'economy',
    stops: 0
  },
  {
    flightNumber: '6E302',
    from: 'Bengaluru',
    to: 'Kolkata',
    departureTime: '2024-06-06T14:00:00Z',
    arrivalTime: '2024-06-06T17:10:00Z',
    price: 5299.00,
    seatClass: 'economy',
    stops: 0
  },
  {
    flightNumber: 'UK403',
    from: 'Mumbai',
    to: 'Goa',
    departureTime: '2024-06-07T09:00:00Z',
    arrivalTime: '2024-06-07T10:15:00Z',
    price: 3999.00,
    seatClass: 'economy',
    stops: 0
  },
  {
    flightNumber: 'AI204',
    from: 'Delhi',
    to: 'Chennai',
    departureTime: '2024-06-08T05:00:00Z',
    arrivalTime: '2024-06-08T07:30:00Z',
    price: 4799.00,
    seatClass: 'economy',
    stops: 0
  },
  {
    flightNumber: '6E308',
    from: 'Hyderabad',
    to: 'Ahmedabad',
    departureTime: '2024-06-09T16:00:00Z',
    arrivalTime: '2024-06-09T18:10:00Z',
    price: 4599.00,
    seatClass: 'economy',
    stops: 0
  }
];

// Utility to get airport UUID by city
async function getAirportId(city) {
  const code = cityAirportMap[city];
  const { data, error } = await supabase
    .from('airports')
    .select('id')
    .eq('code', code)
    .single();

  if (error || !data) throw new Error(`Airport not found for city: ${city}`);
  return data.id;
}

// Utility to get airline UUID by flight number prefix
async function getAirlineId(flightNumber) {
  const prefix = flightNumber.match(/[A-Z]+/)[0]; // e.g., "AI", "6E"
  const { data, error } = await supabase
    .from('airlines')
    .select('id')
    .ilike('iata_code', prefix)
    .single();

  if (error || !data) throw new Error(`Airline not found for code: ${prefix}`);
  return data.id;
}

const seedDatabase = async () => {
  try {
    logger.info('Seeding Indian flight data...');

    // Optional: Clear old data
    // const { error: deleteError } = await supabase
    //   .from('flights')
    //   .delete()
    //   .neq('id', 0);
    // if (deleteError) throw deleteError;

    // logger.info('Old flight data cleared');

    // const flightsToInsert = [];

    // for (const flight of sampleFlights) {
    //   const departure_airport_id = await getAirportId(flight.from);
    //   const arrival_airport_id = await getAirportId(flight.to);
    //   const airline_id = await getAirlineId(flight.flightNumber);
    //   const departure = new Date(flight.departureTime);
    //   const arrival = new Date(flight.arrivalTime);
    //   const duration_minutes = Math.floor((arrival - departure) / 60000);

    //   flightsToInsert.push({
    //     airline_id,
    //     flight_number: flight.flightNumber,
    //     departure_airport_id,
    //     arrival_airport_id,
    //     departure_time: flight.departureTime,
    //     arrival_time: flight.arrivalTime,
    //     duration_minutes,
    //     price: flight.price,
    //     seat_class: flight.seatClass,
    //     stops: flight.stops
    //   });
    // }

    // const { data, error } = await supabase
    //   .from('flights')
    //   .insert(flightsToInsert)
    //   .select();

    if (error) throw error;

    logger.info(`Inserted ${data.length} Indian flights into the database`);
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding flights:', error.message);
  }
};

seedDatabase();
