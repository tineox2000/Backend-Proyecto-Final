const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
require('./src/utils/auth/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mainRoutes = require('./src/api/main/main.routes');
const userRoutes = require('./src/api/users/user.routes');
const db = require('./src/utils/database/db');
dotenv.config();
db.connect();

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); // permitimos las siguientes operaciones en el servidor
  res.header("Access-Control-Allow-Credentials", "true"); //permitimos que haya credenciales en nuestras peticiones
  res.header("Access-Control-Allow-Headers", "Content-Type"); //definimos el tipo de cabecera que vamos a permitir
  next();
});

app.use(cors({ origin: '*', credentials: true }))

app.use(session({
  secret: 'ASD12sasdjkq!woiej213_SAd!asdljiasjd',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 30 * 1000,
  },
  store: MongoStore.create({ mongoUrl: db.DB_URL })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});