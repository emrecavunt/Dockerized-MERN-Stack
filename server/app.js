import * as config from './config';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


const GRAPHQL_PORT = config.graphqlPort;
const WS_PORT = config.graphqlWsPort;
const MONGO_HOST = config.mongoHost;
const MONGO_PORT = config.mongoPort;
const MONGO_DB = config.mongoDb;
const MONGO_USERNAME = config.mongoUsername;
const MONGO_PASSWORD = config.mongoPassword;


mongoose.Promise = require('bluebird');

mongoose.connection.on('error', err => {
    console.error('MONGO Error: ', err);
    process.exit(2);
});

mongoose.connection.on('connected', () => {
    console.info('Connected to MongoDB Database.');
});


mongoose.connect(
  `mongodb://${
      MONGO_USERNAME ? MONGO_USERNAME + (MONGO_PASSWORD ? ':' + MONGO_PASSWORD : '') + '@' : ''
  }${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}${MONGO_USERNAME ? '?authSource=admin' : ''}`,
  {
      useMongoClient: true,
      poolSize: 10,
  }
).then(result => {
  const server = app.listen(8080);
  const io = require('./socket').init(server);
  io.on('connection', socket => {
    console.log('Client connected');
  });
})
.catch(err => console.log(err));

