const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'studentsubject',
    {
      studentsubjectid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      guid: {
        type: DataTypes.UUID,
      },
      datecreated: {
        type: DataTypes.DATE,
      },
      datemodified: {
        type: DataTypes.DATE,
      },
      datedeleted: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: false }
  );
};
