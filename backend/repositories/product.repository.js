const Product = require("../models/product.model");
const Delivery = require("../models/delivery.model");
const Firm = require("../models/firm.model");

const Route = require("../models/route.model");

async function create(productData) {
  return await Product.create(productData);
}

async function findById(id_product, fk_id_user) {
  return await Product.findOne({
    where: { id_product },
    include: [
      {
        model: Delivery,
        required: true,
        attributes: [],
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
      },
    ],
  });
}

async function findAll(fk_id_user) {
  return await Product.findAll({
    include: [
      {
        model: Delivery,
        required: true,
        attributes: [],
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
      },
    ],
  });
}

async function updateById(productData, fk_id_user, id_product) {
  await Product.update(productData, {
    where: { id_product },
  });
  return await findById(id_product, fk_id_user);
}

async function deleteById(id_product, fk_id_user) {
  return await Product.destroy({
    where: { id_product },
    include: [
      {
        model: Delivery,
        required: true,
        attributes: [],
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
      },
    ],
  });
}

module.exports = {
  create,
  findById,
  findAll,
  updateById,
  deleteById,
};
