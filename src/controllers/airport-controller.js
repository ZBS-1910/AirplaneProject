const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /airplanes
 * req-body {name: 'IGI ', cityId:8,code:DEL}
 */
async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address:req.body.address,
      cityId:req.body.cityId
    });
    SuccessResponse.data = airport;
    return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}

/**
 * POST : /airport
 * req-body {}
 */
async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}

/**
 * POST : /airport/:id
 * req-body {}
 */
async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}

/**
 * DELETE : /airport/:id
 * req-body {}
 */
async function destroyAirport(req, res) {
  try {
    const airport = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = airport;
    return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}

/**
 * PATCH :  /Airports/:id
 * req-body{
 * data :data
 * }
 */
async function updateAirport(req, res) {
  try {
    // Pass both the Airport id and the update data from req.body to the service
    const airport = await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.data = airport;
    return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
