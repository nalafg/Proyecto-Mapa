/**
 * Devuelve todos los lugares registrados en la base de datos.
 */
const dal = require("../PlaceDAL");

module.exports = async (res) => {
  let status = 500;
  let response = {
    message: "Error al obtener los lugares",
  };
  try {
    const places = await dal.findAll({ raw: true });
    if (places) {
      status = 200;
      response = {
        message: "Lugares obtenidos",
        places: places,
      };
    }
  } catch (error) {
    response = {
      message: error,
    };
  }
  res.status(status).json(response);
};
