/**
 * Edita a un usuario
 * @param {string} id
 * @param {object} data
 */
const dal = require("../UserDAL");

module.exports = async ({ id }, { data }, res) => {
  let status = 500;
  let response = {
    message: "Error al editar al usuario",
    parameters: ["id", "data"],
  };
  if (id) {
    const updateUser = await dal.update(
      {
        name: data.name,
        email: data.email,
        birthday: data.birthday,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (updateUser) {
      status = 200;
      response = {
        message: "Usuario editado con exito",
        data: {
          user: {
            id: id,
            name: data.name,
            email: data.email,
            birthday: data.birthday,
          },
        },
      };
    } else {
      response = {
        message: "Error al editar al usuario",
        parameters: ["id"],
      };
    }
  }
  res.status(status).json(response);
};
