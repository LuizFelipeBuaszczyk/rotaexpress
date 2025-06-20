const Delivery = require("../models/delivery.model");
const routeRepository = require("../repositories/route.repository");
const { Op } = require("sequelize");

async function create(deliveryData, fk_id_user) {
  return await Delivery.create(deliveryData, fk_id_user);
}

async function findById(id_delivery, fk_id_user) {
  return await Delivery.findOne({
    where: { id_delivery, fk_id_user },
  });
}

async function updateById(id_delivery, updatedData, fk_id_user) {
  await Delivery.update(updatedData, {
    where: { id_delivery, fk_id_user },
  });
  return await findById(id_delivery, fk_id_user);
}

async function deleteById(id_delivery, fk_id_user) {
  const delivery = await Delivery.findOne({
    where: { id_delivery, fk_id_user },
  });
  if (!delivery) {
    return 0;
  }
  return await Delivery.destroy({
    where: { id_delivery },
  });
}

async function findByUserId(id_user) {
  return await Delivery.findAll({
    where: { fk_id_user: id_user },
  });
}

async function findDeliveryByRouteId(id_route, fk_id_user) {
  return await Delivery.findOne({
    where: { fk_id_route: id_route, fk_id_user },
  });
}

async function findDeliveriesByIds(deliveryIds, fk_id_user) {
  return await Delivery.findAll({
    where: {
      id_delivery: {
        [Op.in]: deliveryIds,
      },
      fk_id_user,
    },
  });
}

async function updateRoute(id_delivery, id_route, fk_id_user) {
  const delivery = await findById(id_delivery, fk_id_user);
  if (!delivery) {
    const error = new Error("Entrega não encontrada");
    error.statusCode = 404;
    throw error;
  }
  console.log(id_route, fk_id_user);
  const route = await routeRepository.findRouteById(id_route, fk_id_user);
  if (!route) {
    const error = new Error("Rota não encontrada");
    error.statusCode = 404;
    throw error;
  }
  await Delivery.update(
    { fk_id_route: id_route },
    { where: { id_delivery, fk_id_user } }
  );
  return await findById(id_delivery, fk_id_user);
}

module.exports = {
  create,
  findById,
  updateById,
  deleteById,
  findByUserId,
  findDeliveryByRouteId,
  findDeliveriesByIds,
  updateRoute,
};
