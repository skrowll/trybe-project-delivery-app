const SvcRegister = require('../services/register.service');
const HttpStatus = require('../../utils/HttpStatus');

const create = async (req, res) => {
  const created = await SvcRegister.create(req.body);
  return res.status(HttpStatus.CREATED).json(created);
};

module.exports = { create };