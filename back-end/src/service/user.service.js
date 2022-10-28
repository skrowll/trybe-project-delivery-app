const md5 = require('md5');
const { User } = require('../database/models');
const { configAuthorization } = require('../utils/Auth');

const loginUser = async ({ password, email }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error('Invalid email');

  const validPass = md5(password) === user.password;

  if (!validPass) {
    const error = new Error('Invalid password');
    error.status = 400;
    throw error;
  }
  
  const token = configAuthorization.signAuth(user);

  if (!validPass) {
    const error = new Error('Invalid token');
    error.status = 400;
    throw error;
  }

  return { name: user.name, email: user.email, role: user.role, token };
};

module.exports = {
  loginUser,
};
