import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db';
import { CLIENT_ORIGIN_URL, PORT } from './config';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
import taskRouter from './routes/taskRoute';

const app = express();

//Connect to Mongo Database
connectDB();

//Because we are hosting a different port on the frontend
app.use(cors({ origin: CLIENT_ORIGIN_URL, credentials: true }));

//Logger
app.use(logger);

//Parser middleware
app.use(express.json());

//Routes
app.use('/api/tasks', taskRouter);

//Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
