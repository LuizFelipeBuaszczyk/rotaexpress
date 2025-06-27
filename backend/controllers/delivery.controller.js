const deliveryService = require("../services/delivery.service");
const ParamsSchema = require("../validators/uuidparam.validator");

async function createDelivery(req, res, next) {
  try {
    const delivery = await deliveryService.createDelivery(
      req.body,
      req.user.id_user
    );
    res.status(201).json(delivery);
  } catch (error) {
    next(error);
  }
}

async function getDeliveries(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = req.params;

    const delivery = await deliveryService.getDelivery(id_user, id);
    if (!delivery) {
      return res.status(404).json({ message: "Entrega não encontrada" });
    }
    res.status(200).json(delivery);
  } catch (error) {
    next(error);
  }
}

async function updateDelivery(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);

    const delivery = await deliveryService.updateDelivery(
      req.body,
      id_user,
      id
    );
    res.status(200).json(delivery);
  } catch (error) {
    next(error);
  }
}

async function deleteDelivery(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);

    const delivery = await deliveryService.deleteDelivery(id_user, id);
    if (!delivery) {
      return res.status(404).json({ message: "Entrega não encontrada" });
    }
    res.status(200).json(delivery);
  } catch (error) {
    next(error);
  }
}

async function updateRoute(req, res, next) {
  try {
    const { id_user } = req.user;
    const { id } = ParamsSchema.parse(req.params);

    const idsDelivery = req.body.deliveryIds;
    const delivery = await deliveryService.updateRoute(
      idsDelivery,
      id,
      id_user
    );
    res.status(200).json(delivery);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createDelivery,
  getDeliveries,
  updateDelivery,
  deleteDelivery,
  updateRoute,
};
