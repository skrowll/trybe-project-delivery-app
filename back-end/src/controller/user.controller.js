const service = require('../service/user.service');

const loginUser = async (req, res) => {
  const user = await service.loginUser(req.body);

  return res.status(200).json(user);
};

module.exports = {
  loginUser,
};
