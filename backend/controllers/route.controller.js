const routeService = require("../services/route.service");
const ParamsSchema = require("../validators/uuidparam.validator");

async function createRoute(req, res, next) {
  try {
    const route = await routeService.createRoute(req.body, req.user.id_user);
    res.status(201).json(route);
  } catch (error) {
    next(error);
  }
}

async function getRouteById(req, res, next) {
  try {
    const { id } = ParamsSchema.parse(req.params);
    const { id_user } = req.user;
    const route = await routeService.getRouteById(id, id_user);
    res.json(route);
  } catch (error) {
    next(error);
  }
}

async function getRouteByFirm(req, res, next) {
  try {
    const { id } = ParamsSchema.parse(req.params);
    const { id_user } = req.user;
    const route = await routeService.getRouteByFirm(id, id_user);
    res.json(route);
  } catch (error) {
    next(error);
  }
}

async function generateOptimizedRoute(req, res, next) {
  try {
    const { deliveryIds, originAddress, routeName, id_delivery_guy, id_route } =
      req.body;
    const route = await routeService.generateOptimizedRoute({
      deliveryIds,
      originAddress,
      routeName,
      id_user: req.user.id_user,
      id_delivery_guy,
      id_route,
    });
    res.status(201).json(route);
  } catch (error) {
    next(error);
  }
}

async function getRoutes(req, res, next) {
  try {
    const { id } = req.params;
    const { id_user } = req.user;

    const routes = id
      ? await routeService.getRouteByFirm(id, id_user)
      : await routeService.getRoutes(id_user);

    res.json(routes);
  } catch (error) {
    next(error);
  }
}

async function updateRoutes(req, res, next) {
  try {
    const updateData = req.body;
    const { id } = ParamsSchema.parse(req.params);
    const { id_user } = req.user;
    const newData = await routeService.updateRoutes(updateData, id, id_user);
    res.json(newData);
  } catch (error) {
    next(error);
  }
}

async function deleteRoutes(req, res, next) {
  try {
    const { id } = ParamsSchema.parse(req.params);
    const { id_user } = req.user;
    await routeService.deleteRoutes(id, id_user);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRoute,
  getRoutes,
  updateRoutes,
  deleteRoutes,
  generateOptimizedRoute,
  getRouteById,
  getRouteByFirm,
};
