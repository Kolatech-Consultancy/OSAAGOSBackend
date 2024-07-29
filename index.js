import express from 'express';
import { connectDB } from './startup/db.js';
import dotenv from 'dotenv';
dotenv.config();
// import { route } from './startup/routes.js';
// import serverConfig from './config/serverConfig.js';

import cors from 'cors';
import router from './routes/index.js';
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const baseUrl = '/api/v1';
const baseUrl_test = '/api/v1/test';
const PORT = process.env.PORT || 4000;

app.use(baseUrl, router);

app.get(baseUrl_test, (req, res) => {
  console.log('Welcome To Kolatech_Backend Api');
});
try {
  await connectDB();
  console.log('MongoDB connected...');
} catch (error) {
  console.log('Error connecting to db: ', error);
}

// route(app);
// app.use(errorHandler())

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
