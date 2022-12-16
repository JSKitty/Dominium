// Classes
import { Couple, Session } from './classes/users';
import { Habit } from './classes/habits';

// Logic
import { generateAccount, getAccount } from './logic/accounts';

// Node Modules
import express from 'express';

// Setup our Express router
export const api = express.Router();

// Account: Generate
api.get('/api/account/generate/:pin', async (req, res) => {
    const pin = req.params.pin;

    // Sanity checks
    if (!Number.isSafeInteger(Number(pin)) || pin.length !== 4) return res.status(400).send("What kinda pin is this? Am I a joke to you?");

    // Generate account with given dom pin
    const account = generateAccount(pin);

    // Generate an authenticated session
    const session = account.createSession(true);

    // Return auth data
    res.send('hey ur access key is ' + account.accessKey + ' and ur dom session is ' + session.token);
});

// Account: Authorise
api.get('/api/account/auth/:accessKey', async (req, res) => {
    const accessKey = req.params.accessKey;

    // Generate account with given dom pin
    const account = getAccount(accessKey);

    // Check if the account exists (if so, it's a valid authorisation)
    if (!account) return res.status(400).send("You might be on mushrooms, that account doesn't exist");

    // Generate an authenticated session (and check if a dom pin was provided)
    const isDom = account.domPin === req.query.pin;
    const session = account.createSession(isDom);

    // Return auth data
    res.send('hey ur access key is ' + account.accessKey + ' and ur ' + (isDom ? 'dom' : 'sub') + ' session is ' + session.token);
});