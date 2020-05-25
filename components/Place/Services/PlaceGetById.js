/**
 * Devuelve todos los lugares registrados en la base de datos.
 * @param [string] id
 */
const dal = require("../PlaceDAL");

module.exports = async ({ id }, res) => {
  let status = 500;
  let response = {
    message: "Error al obtener informacion del lugar",
    parameters: ["id"],
  };
  const place = await dal.findOne({
    where: {
      id: id,
    },
  });
  if (place && place instanceof dal) {
    status = 200;
    response = {
      message: "Lugar obtenido",
      place: place,
    };
  }
  res.status(status).json(response);
};
