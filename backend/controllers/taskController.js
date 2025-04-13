const { Op } = require('sequelize');
const { Task } = require('../models');
const { STATUS } = require('../constants/constants');

const statusTransitionRules = {
	[STATUS.COMPLETED]: [],
	[STATUS.PENDING]: [STATUS.IN_PROGRESS],
	[STATUS.IN_PROGRESS]: [STATUS.COMPLETED],
};

const isValidStatusTransition = (currentStatus, newStatus) => {
	return statusTransitionRules[currentStatus]?.includes(newStatus) || false;
};

exports.getTasks = async (req, res) => {
	try {
		const { status, search } = req.query;
		const { user } = req;
		let where = { user_id: user.id };
		if (status) {
			where.status = status;
		}
		if (search) {
			where = {
				...where,
				[Op.or]: [
					{
						title: { [Op.like]: '%' + search + '%' },
					},
					{
						description: {
							[Op.like]: '%' + search + '%',
						},
					},
				],
			};
		}

		const tasks = await Task.findAll({
			where,
			order: [
				['deadline', 'ASC'],
				['createdAt', 'DESC'],
			],
		});
		return res.status(200).json({ message: 'Success', tasks });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Server error', error: 'Error fetching tasks' });
	}
};

exports.createTask = async (req, res) => {
	try {
		const { body, user } = req;
		const task = await Task.create({
			...body,
			status: body.status || STATUS.PENDING,
			user_id: user.id,
		});
		return res.status(201).json({ message: 'Success', task });
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Server error', error: 'Error creating task' });
	}
};

exports.getTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req;
		const task = await Task.findByPk(id);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		if (task.user_id !== user.id) {
			return res.status(403).json({ message: 'Access denied' });
		}

		return res.status(200).json({ message: 'Success', task });
	} catch (error) {
		console.error('Error in getTask:', error);
		return res
			.status(500)
			.json({ message: 'Server error', error: 'Error fetching task' });
	}
};

exports.updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { body, user } = req;
		const task = await Task.findByPk(id);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		if (task.user_id !== user.id) {
			return res.status(403).json({ message: 'Access denied' });
		}

		if (body.status && !isValidStatusTransition(task.status, body.status)) {
			return res.status(400).json({
				message: `Cannot change status from ${task.status} to ${body.status}`,
			});
		}

		await task.update(body);
		return res.status(200).json({ message: 'Success', task });
	} catch (error) {
		console.error('Error in updateTask:', error);
		return res
			.status(500)
			.json({ message: 'Server error', error: 'Error updating task' });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findByPk(id);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		if (task.user_id !== req.user.id) {
			return res.status(403).json({ message: 'Access denied' });
		}

		if (task.status !== STATUS.COMPLETED) {
			return res.status(403).json({ message: 'Cannot delete task' });
		}

		await task.destroy();
		return res.status(200).send({ message: 'Task deleted successfully' });
	} catch (error) {
		console.error('Error in deleteTask:', error);
		return res
			.status(500)
			.json({ message: 'Server error', error: 'Error deleting task' });
	}
};
