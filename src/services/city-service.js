const {StatusCodes} = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
      const city = await cityRepository.create(data);
      return city;
  } catch(error) {
      if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
          let explanation = [];
          error.errors.forEach((err) => {
              explanation.push(err.message);
          });
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      console.log("got error",error)
      throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
async function destroyCity(id) {
    try {
      const city = await cityRepository.destroy(id);
      // If no record was deleted (ID not found)
      if (city === 0) {
        throw new AppError('City not found. Nothing was deleted.', StatusCodes.NOT_FOUND );
      }
      return city;
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new AppError( 'Cannot delete this city as it is referenced by other records ', StatusCodes.BAD_REQUEST );
      }
      throw new AppError( 'Cannot delete the city object due to an internal error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async function updateCity(id, data) {
    try {
      const city = await cityRepository.update(id, data); // returns [count]
  
      // Check if no rows were updated
      if (city[0] === 0) {
        throw new AppError('City not found. Nothing was updated.', StatusCodes.NOT_FOUND);
      }
  
      return city;
  
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
  
      throw new AppError(
        'Cannot update the city object due to an internal error',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
 


module.exports = {
    createCity,
    destroyCity,
    updateCity
}