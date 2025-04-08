const {StatusCodes} = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Model } = require('sequelize');


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

module.exports={
    createFlight,
}