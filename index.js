const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
require('./src/utils/auth/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mainRoutes = require('./src/api/main/main.routes');
const userRoutes = require('./src/api/users/user.routes');
const storeRoutes = require('./src/api/store/store.routes')
const productRoutes = require('./src/api/product/product.routes');
const db = require('./src/utils/database/db');
const cloudinary = require('cloudinary').v2;
dotenv.config();
db.connect();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); // permitimos las siguientes operaciones en el servidor
  res.header("Access-Control-Allow-Credentials", "true"); //permitimos que haya credenciales en nuestras peticiones
  res.header("Access-Control-Allow-Headers", "Content-Type"); //definimos el tipo de cabecera que vamos a permitir
  next();
});

app.use(cors({ origin: 'https://tangerine-market-react-redux-sass.vercel.app', credentials: true }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120 * 60 * 1000,
  },
  store: MongoStore.create({ mongoUrl: db.DB_URL })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});