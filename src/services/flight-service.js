const {StatusCodes} = require('http-status-codes');
 
 const { FlightRepository } = require('../repositories');
 const AppError = require('../utils/errors/app-error');
 const { Op,sortFilter } = require('sequelize');
 
 
 const flightRepository = new FlightRepository();
 async function createFlight(data) {
     try {
         // Custom validation: Departure time must be before Arrival time
         if (new Date(data.departureTime) >= new Date(data.arrivalTime)) {
             throw new AppError(
                 'Departure time must be earlier than arrival time',
                 StatusCodes.BAD_REQUEST
             );
         }
         const flight = await flightRepository.create(data);
         return flight;
     } catch (error) {
         if (error.name === 'SequelizeValidationError') {
             const explanation = error.errors.map((err) => err.message);
             throw new AppError(explanation, StatusCodes.BAD_REQUEST);
         }
 
         if (error.name === 'SequelizeForeignKeyConstraintError') {
             const message = `Foreign key constraint failed: ${error.index} → ${error.message}`;
             throw new AppError(message, StatusCodes.BAD_REQUEST);
         }
 
         console.log(" Unexpected error in createFlight:", error);
         throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
     }
 }

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter=[]; 
    const endingTripTime="23:59:00";

    //  Filter by trips: e.g., BLR-MUM
    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split('-');

        if (!departureAirportId || !arrivalAirportId) {
            throw new AppError('Invalid trip format. Use format: DEP-ARR', StatusCodes.BAD_REQUEST);
        }

        if (departureAirportId === arrivalAirportId) {
            throw new AppError('Departure and arrival airports cannot be the same', StatusCodes.BAD_REQUEST);
        }

        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    //  Filter by price range
    if (query.price) {
        const [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined)? 20000 : maxPrice)] 
        };
    }

    //  Filter by number of travellers
    if (query.travellers && !isNaN(query.travellers)) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }

    //  Filter by departure date
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]:[ query.tripDate,query.tripDate + "   " + endingTripTime]
        };
       
    }
    if (query.sort) {
        const params = query.sort.split(',');
        
        // Convert "price_ASC,departureTime_DESC" into [["price", "ASC"], ["departureTime", "DESC"]]
        const sortFilters = params.map(param => {
            const [field, order] = param.split('_');
            return [field, (order?.toUpperCase() === 'DESC') ? 'DESC' : 'ASC'];
        });
    
        sortFilter = sortFilters;
    }
    // console.log("error got Custom Filter:", customFilter);
    // console.log("error got sortFliter",sortFilter)
    try {
        const flights = await flightRepository.getAllFlights(customFilter);

        if (!flights || flights.length === 0) {
            throw new AppError('No flights found matching the criteria', StatusCodes.NOT_FOUND);
        }

        return flights;

    } catch (error) {
        console.error("Flight fetch error:", error);
        throw new AppError('Could not retrieve flight data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight, // Assuming this is defined elsewhere
    getAllFlights
};
