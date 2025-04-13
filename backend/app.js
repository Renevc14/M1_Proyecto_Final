require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_ENDPOINT || 'http://localhost:4000',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRoutes);

module.exports = app;
