const Delivery = require("../models/delivery.model");
const Firm = require("../models/firm.model");
const Route = require("../models/route.model");
const { Op } = require("sequelize");

async function create(deliveryData) {
  return await Delivery.create(deliveryData);
}

async function findById(id_delivery, fk_id_user) {
  return await Delivery.findOne({
    where: { id_delivery },
    include: [
      {
        model: Route,
        required: true,
        attributes: [],
        include: [
          {
            model: Firm,
            where: { fk_id_user },
            required: true,
            attributes: [],
          },
        ],
      },
    ],
  });
}

async function updateById(id_delivery, updatedData, fk_id_user) {
  await Delivery.update(updatedData, {
    where: { id_delivery },
  });
  return await findById(id_delivery, fk_id_user);
}

async function deleteById(id_delivery, fk_id_user) {
  const delivery = await Delivery.findOne({
    where: { id_delivery },
    include: [
      {
        model: Route,
        required: true,
        attributes: [],
        include: [
          {
            model: Firm,
            where: { fk_id_user },
            required: true,
            attributes: [],
          },
        ],
      },
    ],
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
    include: [
      {
        model: Route,
        required: true,
        attributes: [],
        include: [
          {
            model: Firm,
            where: { fk_id_user: id_user },
            required: true,
            attributes: [],
          },
        ],
      },
    ],
  });
}

async function findDeliveryByRouteId(id_route, fk_id_user) {
  return await Delivery.findOne({
    where: { fk_id_route: id_route },
    include: [
      {
        model: Route,
        required: true,
        attributes: [],
        include: [
          {
            model: Firm,
            where: { fk_id_user },
            required: true,
            attributes: [],
          },
        ],
      },
    ],
  });
}

async function findDeliveriesByIds(deliveryIds, fk_id_user) {
  return await Delivery.findAll({
    where: {
      id_delivery: {
        [Op.in]: deliveryIds,
      },
    },
    include: [
      {
        model: Route,
        required: true,
        attributes: [],
        include: [
          {
            model: Firm,
            where: { fk_id_user },
            required: true,
            attributes: [],
          },
        ],
      },
    ],
  });
}

module.exports = {
  create,
  findById,
  updateById,
  deleteById,
  findByUserId,
  findDeliveryByRouteId,
  findDeliveriesByIds,
};
