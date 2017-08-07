const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./helpers/logger');
const errors = require('./helpers/errors');
const serverConfig = require('../config/server.config');

const app = express();
const db = connect();

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

app.use(cors());

const passport = require('./passport')(app);
const routes = require("./routes")(app, passport);
app.use("/", routes);

errors(app);

app.listen(serverConfig.port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.started(serverConfig.port, serverConfig.ip);
});

mongoose.Promise = Promise;
mongoose.set('debug', true);

function connect() {
  const options = {
    server: {
      socketOptions: {
        keepAlive: true,
      }
    },
  };
  const db = mongoose.connect(serverConfig.mongoUri, options).connection;

  db.on("error", (err) => logger.error(err));
  db.on("open", () => logger.connected(serverConfig.mongoUri));

  return db;
}
