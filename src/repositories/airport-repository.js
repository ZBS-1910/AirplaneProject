const CurdRepository= require("./crud-repository");
const{Airport} = require("../models");

class AirportRepository extends CurdRepository {
  constructor() {
    super(Airport);
  }

}
module.exports = AirportRepository;