/**
 * Registra a un usuario
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.birthday
 */
const dal = require("../UserDAL");
const { hashPassword } = require("../../../libs/utils");

module.exports = async ({ name, email, password, birthday }, res) => {
  let status = 500;
  let response = {
    message: "Error al registrar al usuario",
    parameters: ["name", "email", "password", "birthday"],
  };
  if (name && email && password && birthday) {
    const existeUsuario = await dal.findOne({
      where: {
        email: email,
      },
    });
    if (!existeUsuario) {
      const user = await dal.create({
        name: name,
        email: email,
        password: hashPassword(password),
        birthday: birthday,
      });
      if (user && user instanceof dal) {
        status = 201;
        response = {
          message: "Registrado correctamente.",
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              birthday: user.birthday,
            },
          },
        };
      }
    } else {
      status = 500;
      response = {
        message: "Error al registrar al usuario, el correo ya existe.",
        parameters: ["name", "email", "password", "birthday"],
      };
    }
  }

  res.status(status).json(response);
};
