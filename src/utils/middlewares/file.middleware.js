const multer = require("multer");
const path = require("path");

const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const VALID_TYPE_FILE = ["image/jpg", "image/jpeg", "image/png"];

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      console.log('hola')
      cb(null, Date.now() + file.originalname);
    },
    destination: (req, file, cb) => {
      console.log('o')
      cb(null, path.join(__dirname, "../../../public/uploads"));
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log('ok')
    if (!VALID_TYPE_FILE.includes(file.mimetype)) {
      cb(new Error("Invalid type file"));
    } else {
      cb(null, true);
    }
  },
});

// Ahora tenemos un nuevo middleware de subida de archivos

const uploadToCloudinary = async (req, res, next) => {
  if (req.file) {
    console.log('ok')
    const filePath = req.file.path;
    const image = await cloudinary.uploader.upload(filePath);

    //Borrar el archivo local
    // await fs.unlinkSync(filePath);

    //Añadir propiedad file_url a nuestra req
    console.log(image)
    req.file_url = image.secure_url;
    return next();
  } else {
    console.log('hola')
    return next();
  }
};

module.exports = { upload: upload, uploadToCloudinary };
