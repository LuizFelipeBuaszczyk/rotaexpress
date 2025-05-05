const routeRepository = require("../repositories/route.repository");
const firmRepository = require("../repositories/firm.repository");
const isValidCPF = require("../utils/cpf.validator");

async function createRoute(routeData, id_user) {
  console.log(routeData);
  console.log(id_user);
  const firm = await firmRepository.findNameById(id_user, routeData.firm_name);

  if (!firm) {
    const error = new Error("Firma não encontrada");
    error.statusCode = 404;
    throw error;
  }

  if (routeData.cpf && !isValidCPF(routeData.cpf)) {
    const error = new Error("CPF inválido");
    error.statusCode = 400;
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

async function updateRoutes(newData, routeId, id_user) {
  if (newData.cpf && !isValidCPF(newData.cpf)) {
    const error = new Error("CPF inválido");
    error.statusCode = 400;
    throw error;
  }
  const updatedRoute = await routeRepository.updateRoutes(
    newData,
    routeId,
    id_user
  );

  if (updatedRoute) return updatedRoute;
  const error = new Error("Rota não encontrada");
  error.statusCode = 404;
  throw error;
}

async function deleteRoutes(routeId, id_user) {
  const route = await routeRepository.deleteRoutes(routeId, id_user);
  if (route) return true;
  const error = new Error("Rota não encontrada");
  error.statusCode = 404;
  throw error;
}

module.exports = {
  createRoute,
  getRouteByFirm,
  getRoutes,
  updateRoutes,
  deleteRoutes,
};
