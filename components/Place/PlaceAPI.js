/**
 * Rutas de Lugares
 */
// Libs
const express = require("express");
const cors = require("cors");
const services = require("./Services");
const Place = express.Router();
const middleware = require("../Middleware");
const { storage } = require("../../libs/utils");
Place.use(express.urlencoded({ extended: false }));
Place.use(express.json());
Place.use(cors());

Place.get("/", (req, res) => {
  services.getAll(res);
});

Place.get("/:id", (req, res) => {
  services.getById(req.params, res);
});

Place.post("/", middleware, storage.upload.single("image"), (req, res) => {
  services.create(req.file, req.body, res);
});

Place.get("/getByUser/:id", middleware, (req, res) => {
  services.getByUser(req.params, res);
});

Place.put("/:id", middleware, storage.upload.single("image"), (req, res) => {
  services.updatePlace(req.file, req.params, req.body, res);
});

Place.delete("/:id", middleware, (req, res) => {
  services.deletePlace(req.params, res);
});

module.exports = Place;
