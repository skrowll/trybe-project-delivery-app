const ServiceUser = require('../services/user.service');
const HttpStatus = require('../../utils/HttpStatus');

const all = async (req, res) => res.status(HttpStatus.OK).json(await ServiceUser.all(req.query));

module.exports = { all };