const { users } = require('../../database/models');

const all = (query) => users.findAll({ where: query, attributes: { exclude: ['password'] } });

const one = (query) => users.findOne({ where: query, attributes: { exclude: ['password'] } });

module.exports = { all, one };