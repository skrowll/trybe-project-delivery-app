const SvcRegister = require('../services/SvcRegister');

const create = async (req, res) => {
  const created = await SvcRegister.create(req.body);

  return res.status(201).json({ created });
};

module.exports = { create };