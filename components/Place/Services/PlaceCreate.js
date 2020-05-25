/*
 * Esta función crea un nuevo lugar en la base de datos.
 * @param [object] data
 * @param [string] data.name
 * @param [string] data.image
 * @param [string] data.lat
 * @param [string] data.lon
 * @param [string] data.description
 *
 */
const dal = require("../PlaceDAL");

module.exports = async (
  img,
  { name, lat, lon, description, userId, qualification, image },
  res
) => {
  let status = 500;
  let response = {
    message: "Error al registrar un lugar",
    parameters: ["name", "image", "lat", "lon", "description", "userId"],
  };
  if (name && lat && lon && description && userId && qualification) {
    try {
      const place = await dal.create({
        name: name,
        image: img ? img.filename : image,
        lat: lat,
        lon: lon,
        description: description,
        qualification: qualification,
        userId: userId,
      });
      if (place) {
        status = 200;
        response = {
          message: "Lugar creado",
          data: {
            place: {
              id: place.id,
              name: place.name,
              image: place.image,
              lat: place.lat,
              lon: place.lon,
              description: place.description,
              qualification: place.qualification,
              userId: place.userId,
            },
          },
        };
      } else {
        status = 400;
      }
    } catch (err) {
      response = {
        message: err,
      };
    }
  }
  res.status(status).json(response);
};
