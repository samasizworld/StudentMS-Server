const asyncHandler = require('express-async-handler');
const { models } = require('../config/database');
const { student, subject, studentsubject } = models;
//desc linksubject and student
//POST - api/students/:studentguid/managestudent
//access -Public
const linkStudentSubject = asyncHandler(async (req, res) => {
  const subjectLists = req.body;
  let errors = [];
  for (let i = 0; i < subjectLists.length; i++) {
    console.log(`Case ${i + 1}`);
    const { subjectId, status } = subjectLists[i];
    const stu = await student.findOne({
      where: { guid: req.params.studentguid, datedeleted: null },
    }); // we extract id from guid
    if (!stu) {
      res.json({ message: 'Student is deleted earlier so we dont find' });
      throw new Error('Student is deleted earlier so we dont find'); //custom error message and halt process here
    }
    const sub = await subject.findOne({
      where: { guid: subjectId, datedeleted: null },
    });

    if (!sub) {
      res.json({ message: 'Subject may be deleted earlier' });
      throw new Error('Subject may be deleted earlier');
    }

    const recordOfstusub = await studentsubject.findOne({
      where: {
        studentid: stu.studentid,
        datedeleted: null,
        subjectid: sub.subjectid,
      },
    });
    //when record matches it gives object whose bool value is true if no matches it gives null whose bool value is false

    // !undefined gives true and {},[] also gives true
    // null is false but !null is true
    if (recordOfstusub && status === '1') {
      //when there is record means record is not null which gives true
      errors.push({
        message: `There is already linked between studentid = ${stu.studentid} and subjectid = ${sub.subjectid} so that no creation`,
      });
    } else if (!recordOfstusub && status === '1') {
      //when there is no record found in studentsubject then create link but there is two case
      //case1 if there is already link deleted update it
      //else create it
      const studentsubjectLink = await studentsubject.findOne({
        where: { studentid: stu.studentid, subjectid: sub.subjectid },
      });
      //if theree is timestamp it is true otherwise not
      if (studentsubjectLink.datedeleted) {
        //updating
        studentsubjectLink.datedeleted = null;
        studentsubjectLink.datecreated = new Date();
        await studentsubjectLink.save();
        errors.push({
          message: `Link Created betweenstudentname= ${stu.firstname} & subjectname = ${sub.subjectname}`,
        });
      } else {
        //creating
        await studentsubject.create({
          studentid: stu.studentid,
          subjectid: sub.subjectid,
        });
        errors.push({
          message: `Link Created betweenstudentname= ${stu.firstname} & subjectname = ${sub.subjectname}`,
        });
      }
    } else if (recordOfstusub && status === '0') {
      // when there is record and status 0 means delete
      console.log('delete link');
      recordOfstusub.datedeleted = new Date();
      await recordOfstusub.save();
      errors.push({ message: 'Student-Subject link deleted  successfully' });
    } else if (!recordOfstusub && status === '0') {
      //when there is no record and  not delete
      errors.push({
        message: `There is no record  studentid = ${stu.studentid} and subjectid = ${sub.subjectid}so nth done with deletion`,
      });
    }
  }
  res.json(errors);
});

module.exports = { linkStudentSubject };
