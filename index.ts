// Node Modules
import express from 'express';
import dotenv from 'dotenv';

// Routes module
import {router} from './src/routes';

// Import .env configuration
dotenv.config();

// Prepare server and load the router
const app = express();
const port = process.env.PORT;
app.use(router);

// Bring the server online
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});