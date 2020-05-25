/**
 * Devuelve todos los lugares registrados por el usuario.
 * @param [string] userId
 */
const dal = require("../PlaceDAL");

module.exports = async ({ id }, res) => {
  let status = 500;
  let response = {
    message: "Error al obtener informacion del lugar",
    parameters: ["id"],
  };
  const places = await dal.findAll({
    where: {
      UserId: id,
    },
  });
  if (places) {
    status = 200;
    response = {
      message: "Lugares obtenidos",
      places: places,
    };
  }
  res.status(status).json(response);
};
