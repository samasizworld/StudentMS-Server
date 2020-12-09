const express = require('express');
const router = express.Router();
const {
  createStudent,
  updateStudent,
  getStudentByUUID,
  getAllStudents,
  deleteStudent,
} = require('../controllers/studentControllers');

const {
  linkStudentSubject,
} = require('../controllers/studentsubjectController');

router.route('/').post(createStudent).get(getAllStudents);
router
  .route('/:uuid')
  .get(getStudentByUUID)
  .delete(deleteStudent)
  .put(updateStudent);
router.route('/:studentguid/managesubject').put(linkStudentSubject);
module.exports = router;
