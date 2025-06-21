const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const Firm = require("./firm.model");

const Route = sequelize.define("routes", {
  id_route: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_delivery_guy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  origin: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  polyline: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  distancia_metros: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  duracao_segundos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  waypoint_order: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

Route.belongsTo(Firm, { foreignKey: "fk_id_firm", onDelete: "CASCADE" });
Firm.hasMany(Route, { foreignKey: "fk_id_firm" });

module.exports = Route;
