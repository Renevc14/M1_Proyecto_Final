const { query, body, validationResult } = require('express-validator');
const { STATUS } = require('../constants/constants');
exports.validate = (method) => {
	switch (method) {
		case 'login': {
			return [
				body('email')
					.isEmail()
					.withMessage('Email is not valid')
					.normalizeEmail(),
				body('password').notEmpty().withMessage('Password is required'),
			];
		}
		case 'register': {
			return [
				body('name')
					.notEmpty()
					.withMessage('Name is required')
					.isString()
					.withMessage('Name must be a string')
					.matches(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s-']+$/)
					.withMessage(
						'Name can only contain letters, spaces, hyphens, apostrophes, and accented characters',
					),
				body('email')
					.isEmail()
					.withMessage('Email is not valid')
					.normalizeEmail(),
				body('password')
					.notEmpty()
					.withMessage('Password is required')
					.isLength({ min: 8 })
					.withMessage('Password must be at least 8 characters long')
					.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
					.withMessage(
						'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
					),
			];
		}
		case 'createTask': {
			return [
				body('title')
					.notEmpty()
					.withMessage('Title is required')
					.isString()
					.withMessage('Title must be a string')
					.trim(),
				body('description')
					.optional()
					.isString()
					.withMessage('Description must be a string')
					.trim(),
				body('status')
					.optional()
					.isIn([
						STATUS.PENDING,
						STATUS.IN_PROGRESS,
						STATUS.COMPLETED,
					])
					.withMessage('Status is not valid'),
				body('deadline')
					.optional()
					.isDate()
					.withMessage('Deadline must be a valid date'),
			];
		}
		case 'updateTask': {
			return [
				body('title')
					.optional()
					.isString()
					.withMessage('Title must be a string')
					.trim(),
				body('description')
					.optional()
					.isString()
					.withMessage('Description must be a string'),
				body('status')
					.optional()
					.isIn([
						STATUS.PENDING,
						STATUS.IN_PROGRESS,
						STATUS.COMPLETED,
					])
					.withMessage('Status is not valid'),
				body('deadline')
					.optional()
					.isDate()
					.withMessage('Deadline must be a valid date'),
			];
		}
		case 'getTasks': {
			return [
				query('status')
					.optional()
					.isIn([
						STATUS.PENDING,
						STATUS.IN_PROGRESS,
						STATUS.COMPLETED,
					])
					.withMessage('Status is not valid'),
				query('search')
					.optional()
					.isString()
					.withMessage('Search must be a string'),
			];
		}
		default:
			return [];
	}
};

exports.validation = (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};
