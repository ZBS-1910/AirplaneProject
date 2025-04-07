const CrudRepository = require('./crud-repository');
const { City } = require('../models'); // ✅ Fixed capitalization

class CityRepository extends CrudRepository {
  constructor() {
    super(City); // ✅ Pass correct model
  }
}

module.exports = CityRepository;
