/**
 * Elimina a un usuario
 * @param {string} id
 */
const dal = require("../UserDAL");

module.exports = async ({ id }, res) => {
  let status = 500;
  let response = {
    message: "Error al eliminar al usuario",
    parameters: ["id"],
  };
  if (id) {
    const deleteUser = await dal.destroy({
      where: {
        id: id,
      },
    });
    if (deleteUser) {
      status = 200;
      response = {
        message: "Usuario eliminado con exito",
      };
    } else {
      response = {
        message: "Error al eliminar al usuario",
        parameters: ["id"],
      };
    }
  }
  res.status(status).json(response);
};
