const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define(
    'subject',
    {
      subjectid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      guid: {
        type: DataTypes.UUID,
      },
      subjectname: {
        type: DataTypes.STRING,
      },
      subjectcode: {
        type: DataTypes.STRING,
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
