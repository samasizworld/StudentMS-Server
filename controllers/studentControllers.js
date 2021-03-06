const { models } = require('../config/database');
const asyncHandler = require('express-async-handler');
const { student, subject, studentsubject } = models;

//desc - create student
//route - POST /api/students
//access Public
const createStudent = asyncHandler(async (req, res) => {
  const { firstname, lastname, address } = req.body;
  const students = await student.create({ firstname, lastname, address });
  //custom
  res.json({
    studentId: students.guid,
    firstName: students.firstname,
    lastName: students.lastname,
    address: students.address,
    createdAt: students.datecreated,
    modifiedAt: students.datemodified,
  });
});

//desc get all students list
//access - Public
//routes GET /api/students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await student.findAll({
    where: { datedeleted: null },
    include: [
      {
        model: subject,
        through: { attributes: ['datedeleted'], where: { datedeleted: null } },
      },
    ],
  });
  //for custom object creation
  const studentList = students.map((s) => {
    return {
      studentId: s.guid,
      firstName: s.firstname,
      lastName: s.lastname,
      address: s.address,
      createdAt: s.datecreated,
      modifiedAt: s.datemodified,
      subjects: s.subjects.map((sub) => {
        return {
          subjectId: sub.guid,
          subjectCode: sub.subjectcode,
          subjectName: sub.subjectname,
        };
      }),
    };
  });
  res.json(studentList);
});

//desc - get student  by uuid
//route - GET /api/students/:uuid
//access Public
const getStudentByUUID = asyncHandler(async (req, res) => {
  const std = await student.findOne({
    where: { guid: req.params.uuid, datedeleted: null },
    include: [
      {
        model: subject,
        through: {
          attributes: ['datedeleted'],
          where: { datedeleted: null },
        },
      },
    ],
  });
  if (std) {
    // custom objects
    res.json({
      studentId: std.guid,
      firstName: std.firstname,
      lastName: std.lastname,
      address: std.address,
      createdAt: std.datecreated,
      modifiedAt: std.datemodified,
      subjects: std.subjects.map((sub) => {
        return {
          subjectId: sub.guid,
          subjectCode: sub.subjectcode,
          subjectName: sub.subjectname,
        };
      }),
    });
  } else {
    res
      .status(404)
      .json({ message: `Not found with these ${req.params.uuid}` });
  }
});

//desc - update students  by uuid
//route PUT /api/students/:uid
//access Public

const updateStudent = asyncHandler(async (req, res) => {
  const { firstname, lastname, address } = req.body;
  const std = await student.findOne({
    where: { guid: req.params.uuid, datedeleted: null },
  });
  if (std) {
    std.datemodified = new Date();
    std.firstname = firstname;
    std.lastname = lastname;
    std.address = address;
    const updatedStudent = await std.save();
    //custom
    res.json({
      studentId: updatedStudent.guid,
      firstName: updatedStudent.firstname,
      lastName: updatedStudent.lastname,
      address: updatedStudent.address,
      createdAt: updatedStudent.datecreated,
      modifiedAt: updatedStudent.datemodified,
    });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

//desc delete student by uuid
//access - public
//routes Delete api/students/:uuid
const deleteStudent = asyncHandler(async (req, res) => {
  const std = await student.findOne({
    where: { guid: req.params.uuid, datedeleted: null },
  });
  if (std) {
    std.datedeleted = new Date();

    const stdsub = await studentsubject.findAll({
      where: { studentid: std.studentid },
    });
    for (let i = 0; i < stdsub.length; i++) {
      stdsub[i].datedeleted = new Date();
      await stdsub[i].save();
    }

    await std.save();

    res.json({ message: 'Student deleted successfully' });
  } else {
    res.json({ message: 'Student Already deleted' });
  }
});

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByUUID,
  updateStudent,
  deleteStudent,
};
