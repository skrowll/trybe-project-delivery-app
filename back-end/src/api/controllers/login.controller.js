const loginService = require('../services/login.service');
const HttpStatus = require('../../utils/HttpStatus');

const loginUser = async (req, res) => {
  const user = await loginService.loginUser(req.body);
  return res.status(HttpStatus.OK).json(user);
};

module.exports = {
  loginUser,
};
