// Node Modules
import express from 'express';

// Route Modules
import { api } from './api';

// Setup our Express router, then connect all our route modules
export const router = express.Router();
router.use(api);

// Root (Frontend)
router.get('/', (req, res) => {
    res.send('Here\'s a sexy frontend for Dominium, where you can train your sub/pet to be the goodest lil\' collared thing <3');
});