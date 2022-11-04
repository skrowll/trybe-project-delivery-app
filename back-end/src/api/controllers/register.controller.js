const ServiceRegister = require('../services/register.service');
const HttpStatus = require('../../utils/HttpStatus');

const create = async (req, res) => {
  const created = await ServiceRegister.create(req.body);
  return res.status(HttpStatus.CREATED).json(created);
};

const adminCreate = async (req, res) => {
  const created = await ServiceRegister.adminCreate(req.body);

  return res.status(HttpStatus.CREATED).json(created);
};

module.exports = { create, adminCreate };