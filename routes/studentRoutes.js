const express = require('express');
const router = express.Router();
const {
  createStudent,
  updateStudent,
  getStudentByUUID,
  getAllStudents,
  deleteStudent,
} = require('../controllers/studentControllers');

router.route('/').post(createStudent).get(getAllStudents);
router
  .route('/:uuid')
  .get(getStudentByUUID)
  .delete(deleteStudent)
  .put(updateStudent);

module.exports = router;
