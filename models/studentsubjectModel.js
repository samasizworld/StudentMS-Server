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
      studentid: {
        type: DataTypes.INTEGER,
        references: {
          model: 'student',
          key: 'studentid',
        },
      },
      subjectid: {
        type: DataTypes.INTEGER,
        references: {
          model: 'subject',
          key: 'subjectid',
        },
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
