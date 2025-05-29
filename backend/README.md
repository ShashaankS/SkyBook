# SkyBook Flight Booking API

A Node.js backend API for flight booking system using Express and Supabase.

## Features

- Flight search and management
- Booking creation and management
- Data validation
- Error handling and logging
- Supabase integration
- Sample data seeding

## Prerequisites

- Node.js (v14 or higher)
- Supabase account and project

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd skybook
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase database tables:

Create the following tables in your Supabase dashboard:

**flights**
- id (uuid, primary key)
- flightNumber (text)
- from (text)
- to (text)
- departureTime (timestamp with time zone)
- arrivalTime (timestamp with time zone)
- price (numeric)
- seats (integer)

**bookings**
- id (uuid, primary key)
- flightId (uuid, foreign key to flights.id)
- passengerName (text)
- email (text)
- phoneNumber (text)
- seatNumber (text)
- status (text)
- bookingDate (timestamp with time zone)

5. Seed the database with sample data:
```bash
npm run seed
```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Flights

- `GET /api/flights` - Search flights (query params: from, to, date)
- `GET /api/flights/:id` - Get flight details
- `POST /api/flights` - Create a new flight
- `PUT /api/flights/:id` - Update flight details
- `DELETE /api/flights/:id` - Delete a flight

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get booking details
- `DELETE /api/bookings/:id` - Cancel a booking

## Testing Locally

1. Start the server:
```bash
npm run dev
```

2. Use curl or Postman to test the endpoints:

Search flights:
```bash
curl "http://localhost:3000/api/flights?from=London&to=New York"
```

Create a booking:
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "flightId": "flight-uuid",
    "passengerName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "seatNumber": "12A"
  }'
```

## Error Handling

The API uses appropriate HTTP status codes and returns error messages in the following format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Logging

Logs are stored in:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

## Security

- Input validation using express-validator
- CORS enabled
- Environment variables for sensitive data
- Error messages don't expose internal details

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 