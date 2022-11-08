const register = require('./register.routes');
const login = require('./login.routes');
const customer = require('./customer.routes');
const admin = require('./admin.routes');
const user = require('./user.routes');
const seller = require('./sale.routes');

module.exports = { register, login, admin, customer, user, seller };
