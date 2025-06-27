const Firm = require("../models/firm.model");
const Route = require("../models/route.model");
const { Op } = require("sequelize");

async function create(firmData) {
  return await Firm.create(firmData);
}

async function findNameById(fk_id_user, name) {
  return await Firm.findOne({ where: { fk_id_user, name } });
}

async function findByIdUser(fk_id_user) {
  return await Firm.findAll({
    where: { fk_id_user },
    attributes: ["id_firm", "name", "address"],
  });
}

async function updateById(firmData, id_firm, fk_id_user) {
  await Firm.update(firmData, {
    where: { id_firm },
  });
  return await findById(id_firm, fk_id_user);
}

async function deleteById(id_firm) {
  return await Firm.destroy({
    where: { id_firm },
  });
}

async function findByIdAndIdUser(id_firm, fk_id_user) {
  return await Firm.findOne({
    where: { id_firm, fk_id_user },
  });
}

async function findById(id_firm) {
  return await Firm.findOne({
    where: { id_firm },
  });
}

async function findAllByName(name, fk_id_user) {
  const searchName = `%${name}%`;

  return await Firm.findAll({
    where: {
      fk_id_user: fk_id_user,
      name: {
        [Op.like]: searchName,
      },
    },
  });
}

async function findFirmByRouteId(fk_id_user, id_route) {
  return await Firm.findOne({
    include: [
      {
        model: Route,
        where: {
          id_route,
        },
        attributes: [],
      },
    ],
    where: { fk_id_user },
  });
}

module.exports = {
  create,
  findNameById,
  findByIdUser,
  updateById,
  deleteById,
  findByIdAndIdUser,
  findById,
  findAllByName,
  findFirmByRouteId,
};
