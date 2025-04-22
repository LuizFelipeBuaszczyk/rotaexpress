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

module.exports = {
  create,
  findRouteByFirm,
  findRoutes,
};
