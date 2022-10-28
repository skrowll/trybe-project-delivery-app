const md5 = require('md5');
const { User } = require('../../database/models');

const create = async (payload) => {
  const { email, password } = payload;

  const existingUser = await User.findOne({ where: { email, password } });

  if (existingUser) throw new Error('User already registered', { cause: { status: 409 } });

  return User.create({ ...payload, password: md5(password) });
};

module.exports = { create };