const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(12).required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(6).required(),
});

const validateInputs = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = schema.validate({ name, email, password });

  if (error) return res.status(401).json({ message: error.message });

  next(); 
};

module.exports = { validateInputs };