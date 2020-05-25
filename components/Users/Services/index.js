const login = require("./UserLogin");
const isAuth = require("./UserIsAuth");
const register = require("./UserRegister");
const updateUser = require("./UserUpdate");
const deleteUser = require("./UserDelete");
module.exports = {
  login,
  isAuth,
  register,
  updateUser,
  deleteUser,
};
