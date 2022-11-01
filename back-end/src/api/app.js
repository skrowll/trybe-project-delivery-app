require('express-async-errors');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/login.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/customer', routes.customer);
app.use('/admin', routes.admin);
app.use('/customer', routes.customer);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
