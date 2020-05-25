// Libs
const express = require("express");
const cors = require("cors");
const path = require("path");
// Components
const Place = require("./components/Place/Place");
const User = require("./components/Users/User");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.set("port", 3000);

// Routes
app.use("/lugares", Place.api);
app.use("/usuarios", User.api);
//Static
app.use(express.static(path.join(__dirname, "subidas")));
app.use(express.static("public"));

app.listen(app.get("port"), () => {
  // Set up
  console.log("Servidor corriendo en puerto", app.get("port"));
});
