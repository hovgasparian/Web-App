const express = require('express');
const sequelize = require('./config/database.js');
const routes = require('./src/routes/index.js');
const logger = require('morgan');
const cors = require('cors');
const { PORT } = require("./utils/constants.js");

const app = express();

const port = PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST']
}));

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);


app.use(express.json());

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('[server]: Error starting server:', error);
    process.exit(1);
  }
};

startServer();
