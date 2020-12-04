const applyAssociation = (sequelize) => {
  const { student, subject } = sequelize.models;
  //M-N relation between student model and subject model with join table studentsubject
  student.belongsToMany(subject, { through: 'studentsubject' });
};

module.exports = { applyAssociation };
