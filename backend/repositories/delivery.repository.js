const Delivery = require("../models/delivery.model");
const routeRepository = require("../repositories/route.repository");
const { Op } = require("sequelize");
const Route = require("../models/route.model");
const Firm = require("../models/firm.model");

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

async function updateAllDeliveriesForRoute(id_route, idsDelivery, fk_id_user) {
  await Delivery.update(
    { fk_id_route: null },
    {
      where: {
        fk_id_user: fk_id_user,
        fk_id_route: id_route,
      },
    }
  );
  if (idsDelivery && idsDelivery.length > 0) {
    await Delivery.update(
      { fk_id_route: id_route },
      {
        where: {
          fk_id_user: fk_id_user,
          id_delivery: {
            [Op.in]: idsDelivery,
          },
        },
      }
    );
  }
  await Route.update(
    {
      polyline: null,
      distancia_metros: null,
      duracao_segundos: null,
      waypoint_order: null,
    },
    {
      where: {
        id_route: id_route,
      },
      include: [
        {
          model: Firm,
          where: { fk_id_user },
          required: true,
        },
      ],
    }
  );

  return true;
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
  updateAllDeliveriesForRoute,
};
