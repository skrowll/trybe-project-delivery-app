const md5 = require('md5');
const { users } = require('../../database/models');
const { configAuthorization } = require('../../utils/Auth');

const loginUser = async ({ password, email }) => {
  const user = await users.findOne({ where: { email } });

  if (!user) throw new Error('Invalid email', { cause: { status: 404 } });

  const validPass = md5(password) === user.password;

  if (!validPass) throw new Error('Invalid password', { cause: { status: 400 } });
  
  const { password: _, ...foundUserInfo } = user.get();
  
  const token = configAuthorization.signAuth(foundUserInfo);

  if (!token) throw new Error('Invalid token', { cause: { status: 400 } });

  return { name: user.name, email: user.email, role: user.role, token };
};

module.exports = {
  loginUser,
};
