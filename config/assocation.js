const applyAssociation = (models) => {
  const { student, subject, studentsubject } = models;
  //M-N relation between student model and subject model with join table studentsubject
  student.belongsToMany(subject, {
    through: studentsubject,
    foreignKey: 'studentid',
  });
  subject.belongsToMany(student, {
    through: studentsubject,
    foreignKey: 'subjectid',
  });
};

module.exports = { applyAssociation };
