/**
 * Elimina un lugar
 * @param {string} id
 */
const dal = require("../PlaceDAL");
const fs = require("fs");
const path = require("path");
module.exports = async ({ id }, res) => {
  let status = 500;
  let response = {
    message: "Error al eliminar el lugar",
    parameters: ["id"],
  };
  if (id) {
    const place = await dal.findOne({
      where: {
        id: id,
      },
    });
    if (place) {
      const deletePlace = await dal.destroy({
        where: {
          id: id,
        },
      });
      const fileDeleted = deleteFile(place.image);
      if (deletePlace && fileDeleted) {
        status = 200;
        response = {
          message: "Lugar eliminado con exito",
        };
      } else {
        response = {
          message: "Error al eliminar el lugar",
          parameters: ["id"],
        };
      }
    }
  }
  res.status(status).json(response);
};
const deleteFile = async (fileName) => {
  try {
    const fileDeleted = await fs.unlinkSync(path.join("./subidas/", fileName));
    if (fileDeleted) return 1;
  } catch (err) {
    return null;
  }
};
