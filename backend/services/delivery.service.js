const deliveryRepository = require("../repositories/delivery.repository");
const routeRepository = require("../repositories/route.repository");

async function createDelivery(deliveryData, id_user) {
  if (deliveryData.fk_id_route === undefined) deliveryData.fk_id_route = null;
  if (deliveryData.fk_id_route !== null) {
    const route = await routeRepository.findRouteById(
      deliveryData.fk_id_route,
      id_user
    );
    if (!route) {
      const error = new Error("Rota não encontrada");
      error.statusCode = 404;
      throw error;
    }
  }
  return await deliveryRepository.create(deliveryData, id_user);
}

async function getDelivery(id_user) {
  const delivery = await deliveryRepository.findByUserId(id_user);
  if (!delivery) {
    const error = new Error("Entrega não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return delivery;
}

async function updateDelivery(deliveryData, id_user, id_delivery) {
  const route = await deliveryRepository.findById(id_delivery, id_user);
  if (!route) {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    throw error;
  }
  const delivery = await deliveryRepository.updateById(
    id_delivery,
    deliveryData,
    id_user
  );
  if (!delivery) {
    const error = new Error("Entrega não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return delivery;
}

async function deleteDelivery(id_user, id_delivery) {
  const delivery = await deliveryRepository.findById(id_delivery, id_user);
  if (!delivery) {
    const error = new Error("Entrega não encontrada");
    error.statusCode = 404;
    throw error;
  }
  return await deliveryRepository.deleteById(id_delivery, id_user);
}

async function updateRoute(idsDelivery, id_route, id_user) {
  for (const id_delivery of idsDelivery) {
    const delivery = await deliveryRepository.findById(id_delivery, id_user);
    if (!delivery) {
      const error = new Error("Entrega não encontrada");
      error.statusCode = 404;
      throw error;
    }
    const route = await routeRepository.findRouteById(id_route, id_user);
    if (!route) {
      const error = new Error("Rota não encontrada");
      error.statusCode = 404;
      throw error;
    }
    await deliveryRepository.updateRoute(id_delivery, id_route, id_user);
  }
  return routeRepository.findRouteById(id_route, id_user);
}

module.exports = {
  createDelivery,
  getDelivery,
  updateDelivery,
  deleteDelivery,
  updateRoute,
};
