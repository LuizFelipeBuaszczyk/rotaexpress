const deliveryRepository = require("../repositories/delivery.repository");
const routeRepository = require("../repositories/route.repository");

async function createDelivery(deliveryData, id_user) {
  const route = await routeRepository.findRouteById(
    deliveryData.fk_id_route,
    id_user
  );
  if (!route) {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    throw error;
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

module.exports = {
  createDelivery,
  getDelivery,
  updateDelivery,
  deleteDelivery,
};
