const { loginService } = require('../services');

const executeLogin = async (req, res) => {
  const { email, password } = req.body;

  const { status, data } = await loginService.executeLogin({ email, password });

  if (data.message) return res.status(status).json(data);

  return res.status(status).json({ token: data });
};

module.exports = {
  executeLogin,
};