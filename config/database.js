const { Sequelize } = require('sequelize');
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

//define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
// We execute any extra setup after the models are defined, such as adding associations.
//applyAssociation(sequelize);

module.exports = sequelize;
