const register = require('./register.routes');
const login = require('./login.routes');
const customer = require('./customer.routes');
const admin = require('./admin.routes');

module.exports = { register, login, admin, customer };
