const md5 = require('md5');
const { users } = require('../../database/models');
const { configAuthorization } = require('../../utils/Auth');

const loginUser = async ({ password, email }) => {
  const user = await users.findOne({ where: { email } });

  if (!user) throw new Error('Invalid email', { cause: { status: 404 } });

  const validPass = md5(password) === user.password;

  if (!validPass) throw new Error('Invalid password', { cause: { status: 400 } });
  //   const error = new Error('Invalid password');
  //   error.status = 400;
  //   throw error;
  // }
  
  const token = configAuthorization.signAuth(user);

  if (!token) throw new Error('Invalid token', { cause: { status: 400 } });
  //   const error = new Error('Invalid token');
  //   error.status = 400;
  //   throw error;
  // }

  return { name: user.name, email: user.email, role: user.role, token };
};

module.exports = {
  loginUser,
};
