const CrudRepository = require('./crud-repository');
const { city } = require('../models'); // Correctly importing model

class CityRepository extends CrudRepository {
  constructor() {
    super(city); // 🔥 This passes the model to CrudRepository
  }
}

module.exports = CityRepository;
