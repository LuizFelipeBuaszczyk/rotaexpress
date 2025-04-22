const routeService = require("../services/route.service");

async function createRoute(req, res, next) {
  try {
    const route = await routeService.createRoute(req.body, req.user.id_user);
    res.status(201).json(route);
  } catch (error) {
    next(error);
  }
}

async function getRoutes(req, res, next) {
  try {
    const { firm } = req.query;
    const { id_user } = req.user;

    const routes = firm
      ? await routeService.getRouteByFirm(firm, id_user)
      : await routeService.getRoutes(id_user);

    res.json(routes);
  } catch (error) {
    next(error);
  }
}

module.exports = { createRoute, getRoutes };
