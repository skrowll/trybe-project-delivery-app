const register = require('./register.routes');
const login = require('./login.routes');
const admin = require('./admin.routes');
const customer = require('./customer.routes');

module.exports = { register, login, customer, admin };
