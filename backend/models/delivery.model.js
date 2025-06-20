const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const Route = require("./route.model");

const Delivery = sequelize.define("deliveries", {
  id_delivery: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  fk_id_user: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Delivery.belongsTo(Route, { foreignKey: "fk_id_route", onDelete: "CASCADE" });
Route.hasMany(Delivery, { foreignKey: "fk_id_route" });

module.exports = Delivery;
