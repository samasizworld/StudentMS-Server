const sequelize = require('../config/database');
const { subject } = sequelize.models;

//desc -create subject
//routes - POST api/subjects
//access -Public
const addSubject = async (req, res) => {
  try {
    const { subjectname, subjectcode } = req.body;
    const sub = await subject.create({ subjectname, subjectcode });
    if (sub) {
      res.status(201).json({ sub });
    } else {
      res.json({ message: 'Subject was unable to create' });
    }
  } catch (err) {
    console.log(err);
  }
};

//desc -get subject
//routes - GET api/subjects
//access -Public
const getSubjects = async (req, res) => {
  try {
    const subjects = await subject.findAll();
    res.json({ subjects });
  } catch (err) {
    console.log(err);
  }
};

//desc -get subject by guid
//routes - GET api/subjects/:uuid
//access -Public
const getSubjectByUUID = async (req, res) => {
  try {
    const sub = await subject.findOne({ where: { guid: req.params.uuid } });
    if (sub) {
      res.json({ sub });
    } else {
      res
        .status(404)
        .json({ message: `Not found with these ${req.params.uuid}` });
    }
  } catch (err) {
    res.status(404).json({ message: 'Not Found' });
  }
};

//desc - update subject by uuid
//routes - PUT api/subjects
//access -Public
const updateSubject = async (req, res) => {
  try {
    const { subjectname, subjectcode } = req.body;
    const sub = await subject.findOne({ where: { guid: req.params.uuid } });
    if (sub) {
      sub.datemodified = new Date();
      sub.subjectname = subjectname;
      sub.subjectcode = subjectcode;
      const updatedSubject = await sub.save();
      res.json({ updatedSubject });
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (err) {
    console.log(err);
  }
};

//desc -delete subject by guid
//routes -DELETE api/subjects/:uuid
//access -Public
const deleteSubject = async (req, res) => {
  try {
    const sub = await subject.findOne({
      where: { guid: req.params.uuid },
    });
    if (sub) {
      await sub.destroy();
      res.json({ message: 'Subject deleted successfully' });
    } else {
      res.json({ message: 'No Subject found' });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  deleteSubject,
  getSubjectByUUID,
  getSubjects,
  updateSubject,
  addSubject,
};
