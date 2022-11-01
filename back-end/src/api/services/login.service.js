const md5 = require('md5');
const { users } = require('../../database/models');
const { configAuthorization } = require('../../utils/Auth');
const HttpStatus = require('../../utils/HttpStatus');

const loginUser = async ({ password, email }) => {
  const user = await users.findOne({ where: { email } });

  if (!user) {
    const error = new Error('Invalid email');
    error.status = HttpStatus.BAD_REQUEST;
    throw error;
  }

  const validPass = md5(password) === user.password;

  if (!validPass) {
    const error = new Error('Invalid password');
    error.status = HttpStatus.BAD_REQUEST;
    throw error;
  }
  
  const token = configAuthorization.signAuth(user);

  if (!token) {
    const error = new Error('Invalid token');
    error.status = HttpStatus.BAD_REQUEST;
    throw error;
  }

  return { name: user.name, email: user.email, role: user.role, token };
};

module.exports = {
  loginUser,
};
