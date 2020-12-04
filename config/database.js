const { Sequelize } = require('sequelize');
//const { applyAssociation } = require('./assocation');
const config = require('./config.json');
const {
  database,
  username,
  password,
  localhost,
  databasePlatform,
  pool,
} = config;

const sequelize = new Sequelize(database, username, password, {
  host: localhost,
  dialect: databasePlatform,
  pool,
});
const modelDefiners = [
  require('../models/studentModel'),
  require('../models/subjectModel'),
  require('../models/studentsubjectModel'),
];
console.log(sequelize.models.student);
//define all models according to their files.
for (const modelDefiner of modelDefiners) {
  // of keyword just for array
  modelDefiner(sequelize); // pass sequelize instance to models defined in models file by invoking modelDefiner function
}
// We execute any extra setup after the models are defined, such as adding associations.
//applyAssociation(sequelize);

module.exports = sequelize;
