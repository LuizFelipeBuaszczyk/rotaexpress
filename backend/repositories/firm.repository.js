const Firm = require("../models/firm.model");

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
  return findById(id_firm, fk_id_user);
}

async function deleteById(id_firm) {
  return await Firm.destroy({
    where: { id_firm },
  });
}

async function findById(id_firm, fk_id_user) {
  return await Firm.findOne({
    where: { id_firm, fk_id_user },
  });
}

module.exports = {
  create,
  findNameById,
  findByIdUser,
  updateById,
  deleteById,
  findById,
};
