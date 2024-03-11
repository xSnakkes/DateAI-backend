import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './src/router/router';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const start = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', router);

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start()