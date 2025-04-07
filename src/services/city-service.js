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
      console.log("UpdateCity - ID:", id);
      console.log("UpdateCity - Data:", data);
  
      const city = await cityRepository.update(id, data);
  
      if (!city || city === 0) {
        throw new AppError('No city found with the given ID or no changes were made.', StatusCodes.NOT_FOUND);
      }
  
      return city;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const explanation = error.errors.map(err => err.message);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
  
      console.error("Error while updating city:", error);
      throw new AppError('Cannot found the city you wanted to update the city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
  
  
async function getCities() {
  try {
      const city = await cityRepository.getAll();
      return city;
  } catch(error) {
      throw new AppError('Cannot fetch data of all the city', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getcity(id) {
  try {
      const city = await cityRepository.get(id);
      return city;
  } catch(error) {
      if(error.statusCode == StatusCodes.NOT_FOUND) {
          throw new AppError('The city you requested is not present', error.statusCode);
      }
      throw new AppError('Cannot fetch data of all the city', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


  
 


module.exports = {
    createCity,
    destroyCity,
    updateCity,
    getCities,
    getcity
    
}