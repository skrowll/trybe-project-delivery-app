const md5 = require('md5');
const { users } = require('../../database/models');
const { configAuthorization } = require('../../utils/Auth');
const HttpStatus = require('../../utils/HttpStatus');

const create = async (payload) => {
  const { email, password } = payload;
  const existingUser = await users.findOne({ where: { email, password } });

  if (existingUser) {
    const error = new Error('User already registered');
    error.status = HttpStatus.CONFLICT;
    throw error;
  }
  
  const created = await users.create({ ...payload, password: md5(password) });
  const createdUser = await users.findOne({ where: { email: created.email } });
  const { password: _, ...createdUserWithoutPassword } = createdUser.dataValues;

  const token = configAuthorization.signAuth(createdUserWithoutPassword);
  return { role: createdUser.role, token };
};

const adminCreate = async (payload) => {
  const { email, password } = payload;

  const existingUser = await users.findOne({ where: { email } });

  if (existingUser) throw new Error('User already registered', { cause: { status: 409 } });
  
  const created = await users.create({ ...payload, password: md5(password) });

  const { password: _, ...userWithoutPassword } = created.get();

  return userWithoutPassword;
};

module.exports = { create, adminCreate };