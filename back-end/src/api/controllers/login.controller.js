const loginService = require('../services/login.service');

const loginUser = async (req, res) => {
  const user = await loginService.loginUser(req.body);

  return res.status(200).json(user);
};

module.exports = {
  loginUser,
};
