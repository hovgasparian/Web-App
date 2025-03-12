const express = require('express');
const sequelize = require('./config/database.js');
const routes = require('./src/routes/index.js');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const { PORT } = require("./utils/constants.js");

const app = express();

PORT || 5000;

app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST']
}));


app.use(express.json());


const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Server is connected successfully!');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

const main = async () => {
  try {
    await dbConnection();
    await sequelize.sync();
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(`[server]: Error on initializing server => ${e}`);
  }
};

main().then();
