const express = require('express');
const app = express();

//Express Body parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routing Middleware
const StudentRoutes = require('./routes/studentRoutes');
app.use('/api/students', StudentRoutes);

//sequelize instance import
const sequelize = require('./config/database');
const PORT = 5000;

const DatabaseConnectionOk = async () => {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
};

const init = async () => {
  await DatabaseConnectionOk();

  console.log(`Starting Sequelize + Express on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}.`);
  });
};

init();
