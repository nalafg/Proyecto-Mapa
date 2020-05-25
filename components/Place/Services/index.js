const create = require("./PlaceCreate");
const getAll = require("./PlaceGetAll");
const getById = require("./PlaceGetById");
const deletePlace = require("./PlaceDelete");
const updatePlace = require("./PlaceUpdate");
const getByUser = require("./PlaceByUser");
module.exports = {
  create,
  getAll,
  getById,
  deletePlace,
  updatePlace,
  getByUser,
};
