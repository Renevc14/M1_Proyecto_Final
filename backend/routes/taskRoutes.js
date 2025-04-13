const express = require('express');
const router = express.Router();
const {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} = require('../controllers/taskController');
const { validate, validation } = require('../middleware/validation');
const { verifyToken } = require('../middleware/auth');

router.post('/', [verifyToken, validate('createTask'), validation], createTask);
router.get('/', [verifyToken, validate('getTasks'), validation], getTasks);
router.get('/:id', [verifyToken], getTask);
router.put(
	'/:id',
	[verifyToken, validate('updateTask'), validation],
	updateTask,
);
router.delete('/:id', [verifyToken], deleteTask);

module.exports = router;
