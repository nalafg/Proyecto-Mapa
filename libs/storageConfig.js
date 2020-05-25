const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./subidas");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname).toLowerCase()
    );
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const mimetype = types.test(file.mimetype);
    const extname = types.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb("Error: el archivo debe ser una imagen valida");
  },
});

module.exports = {
  storage: storage,
  upload: upload,
};
