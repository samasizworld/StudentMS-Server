const { models } = require('../config/database');
const { student } = models;

//desc - create student
//route - POST /api/students
//access Public
const createStudent = async (req, res) => {
  try {
    const { firstname, lastname, address } = req.body;
    const students = await student.create({ firstname, lastname, address });
    res.json({ students });
  } catch (err) {
    res.status(404).json({ message: 'Not Created' });
  }
};

//desc - get student  byu uid
//route GET /api/students/:uuid
//access Public
const getStudentByUUID = async (req, res) => {
  try {
    console.log(typeof req.params.uuid);
    const std = await student.findOne({ where: { guid: req.params.uuid } });
    if (std) {
      res.json({ std });
    } else {
      res
        .status(404)
        .json({ message: `Not found with these ${req.params.uuid}` });
    }
  } catch (err) {
    res.status(404).json({ message: 'Not Found' });
  }
};

//desc - update students  by uuid
//route PUT /api/students/:uid
//access Public

const updateStudent = async (req, res) => {
  try {
    const { firstname, lastname, address } = req.body;
    const std = await student.findOne({ where: { guid: req.params.uuid } });
    if (std) {
      std.datemodified = new Date();
      std.firstname = firstname;
      std.lastname = lastname;
      std.address = address;
      const updatedStudent = await std.save();
      res.json({ updatedStudent });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.log(err);
  }
};

//desc get all students list
//access - Public
//routes GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const students = await student.findAll();
    res.json({ students });
  } catch (err) {
    console.error(err);
  }
};

//desc delete student by uuid
//access - public\
//routes Delete api/students/:uuid
const deleteStudent = async (req, res) => {
  try {
    const students = await student.findOne({
      where: { guid: req.params.uuid },
    });
    if (students) {
      await students.destroy();
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.json({ message: 'No Student found' });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByUUID,
  updateStudent,
  deleteStudent,
};
