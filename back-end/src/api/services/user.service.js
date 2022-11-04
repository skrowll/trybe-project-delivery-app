const { users } = require('../../database/models');

const all = (query) => users.findAll({ where: query, attributes: { exclude: ['password'] } });

module.exports = { all };