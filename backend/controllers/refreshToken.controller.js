const refreshService = require("../services/refreshToken.service");

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const data = refreshService.refreshToken(refreshToken);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { refresh };
