// Classes
import { Couple, Session } from './classes/users';
import { Habit } from './classes/habits';

// Logic
import { generateAccount, getAccount, getAccountBySession } from './logic/accounts';

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

    // Find the account by it's access key
    const account = getAccount(accessKey);

    // Check if the account exists (if so, it's a valid authorisation)
    if (!account) return res.status(400).send("You might be on mushrooms, that account doesn't exist");

    // Generate an authenticated session (and check if a dom pin was provided)
    const isDom = account.domPin === req.query.pin;
    const session = account.createSession(isDom);

    // Return auth data
    res.send('hey ur access key is ' + account.accessKey + ' and ur ' + (isDom ? 'dom' : 'sub') + ' session is ' + session.token);
});

// Habits: Create task
api.get('/api/habits/create/:session/:name/:description/:points', async (req, res) => {
    const session = req.params.session;
    const name = req.params.name;
    const description = req.params.description;
    const points = Number(req.params.points);

    // Find the account by it's session key
    const pair = getAccountBySession(session);

    // Check if the account exists
    if (!pair) return res.status(400).send("You might be on mushrooms, that account doesn't exist");

    // Check the session is authorised
    if (!pair.session.dom) return res.status(401).send("Dummy, you can't create tasks! Ask your dom like a good pet");

    // Create the habit task
    const task = pair.account.createTask(name, description, points);

    // Return auth data
    res.json(task);
});

// Habits: Remove task
api.get('/api/habits/remove/:session/:name', async (req, res) => {
    const session = req.params.session;
    const name = req.params.name;

    // Find the account by it's session key
    const pair = getAccountBySession(session);

    // Check if the account exists
    if (!pair) return res.status(400).send("You might be on mushrooms, that account doesn't exist");

    // Check the session is authorised
    if (!pair.session.dom) return res.status(401).send("Dummy, you can't remove tasks! Ask your dom like a good pet");

    // Remove the habit task
    const task = pair.account.removeTask(name);

    // Return auth data
    res.json(task);
});

// Habits: List tasks
api.get('/api/habits/list/:session', async (req, res) => {
    const session = req.params.session;

    // Find the account by it's session key
    const pair = getAccountBySession(session);

    // Check if the account exists (if so, it's a valid authorisation)
    if (!pair) return res.status(400).send("You might be on mushrooms, that account doesn't exist");

    // Return auth data
    res.json(pair.account.habits);
});

// Habits: Complete task
api.get('/api/habits/complete/:session/:name', async (req, res) => {
    const session = req.params.session;
    const name = req.params.name;

    // Find the account by it's session key
    const pair = getAccountBySession(session);

    // Check if the account exists
    if (!pair) return res.status(400).send("You might be on mushrooms, that account doesn't exist");

    // Fetch the task
    const task = pair.account.findTask(name);
    if (!task) return res.status(400).send("Couldn't find that habit task, rip");
    if (task.complete) return res.status(400).send("You already completed that task!");

    // Complete and reward points
    task.complete = true;
    pair.account.points += task.points;

    // Return auth data
    res.send("Atta' pet, you earned " + task.points + " for completing '" + task.name + "', you've got " + pair.account.points + " " + pair.account.pointsName + " to play with now!");
});