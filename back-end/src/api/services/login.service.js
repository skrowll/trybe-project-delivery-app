const md5 = require('md5');
const { users } = require('../../database/models');
const { configAuthorization } = require('../../utils/Auth');
const HttpStatus = require('../../utils/HttpStatus');

const loginUser = async ({ password, email }) => {
  const user = await users.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email', { cause: { status: HttpStatus.BAD_REQUEST } });
  }

  const validPass = md5(password) === user.password;
  if (!validPass) {
    throw new Error('Invalid password', { cause: { status: HttpStatus.BAD_REQUEST } });
  }

  const { password: _, ...foundUserInfo } = user.get();
  
  const token = configAuthorization.signAuth(foundUserInfo);
  if (!token) {
    throw new Error('Invalid token', { cause: { status: HttpStatus.BAD_REQUEST } });
  }

  return { name: user.name, email: user.email, role: user.role, token };
};

module.exports = {
  loginUser,
};
