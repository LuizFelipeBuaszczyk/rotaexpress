const Route = require("../models/route.model");
const Firm = require("../models/firm.model");

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

async function findRouteByFirm(firmName, id_user) {
  return await Route.findAll({
    include: [
      {
        model: Firm,
        where: {
          name: firmName,
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

module.exports = {
  create,
  findRouteByFirm,
  findRoutes,
  updateRoutes,
  deleteRoutes,
};
