const md5 = require('md5');
const { User } = require('../database/models');
const { configAuthorization } = require('../utils/Auth');

const loginUser = async ({ password, email }) => {
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ['id'] },
  });

  if (!user) throw new Error('Not found');

  const validPass = md5(password) === user.password;

  if (!validPass) throw new Error('Invalid password');

  const token = configAuthorization.signAuth(user);

  if (!validPass) throw new Error('Invalid token');

  return {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

module.exports = {
  loginUser,
};
