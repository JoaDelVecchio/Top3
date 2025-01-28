import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db';
import { CLIENT_ORIGIN_URL, PORT } from './config';

const app = express();

//Connect to Mongo Database
connectDB();

//Because we are hosting a different port on the frontend
app.use(cors({ origin: CLIENT_ORIGIN_URL, credentials: true }));

//Parser middleware
app.use(express.json());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
