/**
 * Edita un lugar
 * @param {string} id
 * @param {object} data
 */
const dal = require("../PlaceDAL");
const fs = require("fs");
const path = require("path");
module.exports = async (
  img,
  { id },
  { name, lat, lon, description, userId, qualification },
  res
) => {
  let status = 500;
  let response = {
    message: "Error al editar al lugar",
    parameters: ["name", "image", "lat", "lon", "description", "userId"],
  };
  if (id) {
    const place = await dal.findOne({
      where: {
        id: id,
      },
    });
    const fileDeleted = deleteFile(place.image);
    if (place && fileDeleted) {
      const updatePlace = await dal.update(
        {
          name: name,
          image: img.filename,
          lat: lat,
          lon: lon,
          description: description,
          qualification: qualification,
          userId: userId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (updatePlace) {
        status = 200;
        response = {
          message: "Lugar editado con exito",
          data: {
            place: {
              id: id,
              name: name,
              image: img.filename,
              lat: lat,
              lon: lon,
              description: description,
              qualification: qualification,
              userId: userId,
            },
          },
        };
      } else {
        response = {
          message: "Error al editar al lugar",
          parameters: ["name", "image", "lat", "lon", "description", "userId"],
        };
      }
    } else {
      response = {
        message: "Error al editar al lugar",
        parameters: ["name", "image", "lat", "lon", "description", "userId"],
      };
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
