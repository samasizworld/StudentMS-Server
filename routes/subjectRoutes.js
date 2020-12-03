const express = require('express');
const router = express.Router();
const {
  addSubject,
  getSubjects,
  getSubjectByUUID,
  deleteSubject,
  updateSubject,
} = require('../controllers/subjectController');
router.route('/').get(getSubjects).post(addSubject);
router
  .route('/:uuid')
  .get(getSubjectByUUID)
  .put(updateSubject)
  .delete(deleteSubject);
module.exports = router;
