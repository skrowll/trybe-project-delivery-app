const md5 = require('md5');
const { users } = require('../../database/models');
const { configAuthorization } = require('../../utils/Auth');

const create = async (payload) => {
  const { email, password } = payload;

  const existingUser = await users.findOne({ where: { email, password } });

  if (existingUser) throw new Error('User already registered', { cause: { status: 409 } });
  
  const created = await users.create({ ...payload, password: md5(password) });

  const createdUser = await users.findOne({ where: { email: created.email } });

  console.log('Service  1:', createdUser);

  const { password:_, ...createdUserWithoutPassword } = createdUser;
  
  console.log('Service  2:', createdUserWithoutPassword);

  const token = configAuthorization.signAuth(createdUserWithoutPassword);

  return { role: createdUser.role, token };
};

module.exports = { create };