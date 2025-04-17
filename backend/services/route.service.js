const routeRepository = require("../repositories/route.repository");
const firmRepository = require("../repositories/firm.repository");

async function createRoute(routeData, id_user) {
  console.log(routeData);
  console.log(id_user);
  const firm = await firmRepository.findNameById(id_user, routeData.firm_name);

  if (!firm) {
    const error = new Error("Firma não encontrada");
    error.statusCode = 404;
    throw error;
  }

  routeData.fk_id_firm = firm.id_firm;

  return await routeRepository.create(routeData);
}

async function getRouteByFirm(firm_name, id_user) {
  const firm = await firmRepository.findNameById(id_user, firm_name);

  if (!firm) {
    const error = new Error("Firma não encontrada");
    error.statusCode = 404;
    throw error;
  }

  return await routeRepository.findRouteByFirm(firm_name, id_user);
}

async function getRoutes(id_user) {
  return await routeRepository.findRoutes(id_user);
}

module.exports = {
  createRoute,
  getRouteByFirm,
  getRoutes,
};
