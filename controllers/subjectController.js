const sequelize = require('../config/database');
const { subject, student, studentsubject } = sequelize.models;
const asyncHandler = require('express-async-handler');

//desc -create subject
//routes - POST api/subjects
//access -Public
const addSubject = asyncHandler(async (req, res) => {
  const { subjectname, subjectcode } = req.body;
  const sub = await subject.create({ subjectname, subjectcode });
  if (sub) {
    res.status(201).json({
      subjectId: sub.guid,
      subjectName: sub.subjectname,
      subjectCode: sub.subjectcode,
      createdAt: sub.datecreated,
      modifiedAt: sub.datemodified,
    });
  } else {
    res.json({ message: 'Subject was unable to create' });
  }
});

//desc -get subject
//routes - GET api/subjects
//access -Public
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await subject.findAll({
    where: { datedeleted: null },
    include: [
      {
        model: student,
       
        through: {
          attributes: ['datedeleted'],
          where: { datedeleted: null },
        },
      },
    ],
  });

  //custom
  const subjectList = subjects.map((s) => {
    return {
      subjectId: s.guid,
      subjectName: s.subjectname,
      subjectCode: s.subjectcode,
      createdAt: s.datecreated,
      modifiedAt: s.datemodified,
      students: s.students.map((stu) => {
        return {
          studentId: stu.guid,
          studentName: stu.firstname + stu.lastname,
          address: stu.address,
        };
      }),
    };
  });
  res.json(subjectList);
});

//desc -get subject by guid
//routes - GET api/subjects/:uuid
//access -Public
const getSubjectByUUID = asyncHandler(async (req, res) => {
  const sub = await subject.findOne({
    where: { guid: req.params.uuid, datedeleted: null },
    include: [
      {
        model: student,
        through: {
          attributes: [],
          where:{datedeleted:null}
        },
      },
    ],
  });
  if (sub) {
    res.json({
      subjectId: sub.guid,
      subjectName: sub.subjectname,
      subjectCode: sub.subjectcode,
      createdAt: sub.datecreated,
      modifiedAt: sub.datemodified,
      students: sub.students.map((stu) => {
        return {
          studentId: stu.guid,
          studentName: stu.firstname + stu.lastname,
          address: stu.address,
        };
      }),
    });
  } else {
    res
      .status(404)
      .json({ message: `Not found with these ${req.params.uuid}` });
  }
});

//desc - update subject by uuid
//routes - PUT api/subjects
//access -Public
const updateSubject = asyncHandler(async (req, res) => {
  const { subjectname, subjectcode } = req.body;
  const sub = await subject.findOne({
    where: { guid: req.params.uuid, datedeleted: null },
  });
  if (sub) {
    sub.datemodified = new Date();
    sub.subjectname = subjectname;
    sub.subjectcode = subjectcode;
    const updatedSubject = await sub.save();
    res.json({
      subjectId: updatedSubject.guid,
      subjectName: updatedSubject.subjectname,
      subjectCode: updatedSubject.subjectcode,
      createdAt: updatedSubject.datecreated,
      modifiedAt: updatedSubject.datemodified,
    });
  } else {
    res.status(404).json({ message: 'Subject not found' });
  }
});

//desc -delete subject by guid
//routes -DELETE api/subjects/:uuid
//access -Public
const deleteSubject = asyncHandler(async (req, res) => {
  const sub = await subject.findOne({
    where: { guid: req.params.uuid, datedeleted: null },
  });
  if (sub) {
    sub.datedeleted = new Date();
    const stdsub = await studentsubject.findAll({
      where: { subjectid: sub.subjectid },
    });
    stdsub.forEach(async (s) => {
      s.datedeleted = new Date();
      await s.save();
    });

    await sub.save();
    res.json({ message: 'Subject deleted successfully' });
  } else {
    res.json({ message: 'No Subject found' });
  }
});

module.exports = {
  deleteSubject,
  getSubjectByUUID,
  getSubjects,
  updateSubject,
  addSubject,
};
