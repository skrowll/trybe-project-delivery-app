require('express-async-errors');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./middlewares/auth.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use('/login', routes.login);
app.use('/admin', routes.admin);
app.use('/user', routes.user);
app.use('/register', routes.register);
app.use('/customer', auth.validateCustomerToken, routes.customer);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
