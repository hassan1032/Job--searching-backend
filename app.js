import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
import { errorMiddleware } from './middlewares/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, 'temp');

async function createTempDir() {
  try {
    await fs.mkdir(tempDir);
    console.log(`Directory '${tempDir}' created successfully.`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`Directory '${tempDir}' already exists.`);
    } else {
      console.error(`Error creating directory '${tempDir}': ${err}`);
    }
  }
}

createTempDir(); // Call the function to create the directory

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: tempDir }));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

app.use(errorMiddleware);

export default app;
