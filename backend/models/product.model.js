const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const Delivery = require("./delivery.model");

const Product = sequelize.define("products", {
  id_product: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Product.belongsTo(Delivery, {
  foreignKey: "fk_id_delivery",
  onDelete: "CASCADE",
});
Delivery.hasMany(Product, { foreignKey: "fk_id_delivery" });

module.exports = Product;
