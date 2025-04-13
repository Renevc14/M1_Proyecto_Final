const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ id: user.id, name: user.name },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRATION },
		);

		res.status(200).json({ message: 'Success', token });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

exports.register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'Email already registered' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: 'Registration successful',
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findByPk(req.user.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({
			message: 'Authenticated',
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};
