const Route = require("../models/route.model");
const Firm = require("../models/firm.model");
const Delivery = require("../models/delivery.model");

async function create(routeData) {
  return await Route.create(routeData);
}

async function findRoutes(fk_id_user) {
  return await Route.findAll({
    include: [
      {
        model: Firm,
        attributes: [],
        where: { fk_id_user },
        required: true,
      },
    ],
  });
}

async function findAllRoutesByFirm(fk_id_firm, fk_id_user) {
  return await Route.findAll({
    where: { fk_id_firm },
    include: [
      {
        model: Firm,
        where: { fk_id_user },
        required: true,
        attributes: [],
      },
    ],
  });
}

async function findRouteByFirm(id_firm, id_user) {
  return await Route.findAll({
    include: [
      {
        model: Firm,
        where: {
          id_firm: id_firm,
          fk_id_user: id_user,
        },
        required: true,
        attributes: [],
      },
    ],
  });
}

async function updateRoutes(newData, id_route, fk_id_user) {
  const route = await Route.findOne({
    where: { id_route },
    include: [
      {
        model: Firm,
        where: { fk_id_user },
        required: true,
      },
    ],
  });
  if (!route) return null;
  await Route.update(newData, {
    where: { id_route },
  });
  return await Route.findOne({
    where: { id_route },
    include: [
      {
        model: Firm,
        where: { fk_id_user },
        required: true,
        attributes: [],
      },
    ],
  });
}

async function deleteRoutes(id_route, fk_id_user) {
  const route = await Route.findOne({
    where: { id_route },
    include: [
      {
        model: Firm,
        where: { fk_id_user },
        required: true,
      },
    ],
  });

  if (!route) return null;

  await Route.destroy({
    where: { id_route },
  });

  return true;
}

async function findRouteById(id_route, fk_id_user) {
  return await Route.findOne({
    where: { id_route },
    include: [
      {
        model: Firm,
        where: { fk_id_user },
        required: true,
        attributes: [],
      },
      {
        model: Delivery,
      },
    ],
  });
}

async function findRouteByName(name, fk_id_user) {
  return await Route.findOne({
    where: { name },
    include: [
      {
        model: Firm,
        where: { fk_id_user },
        required: true,
        attributes: [],
      },
    ],
  });
}

module.exports = {
  create,
  findRouteByFirm,
  findRoutes,
  updateRoutes,
  deleteRoutes,
  findRouteById,
  findRouteByName,
  findAllRoutesByFirm,
};
