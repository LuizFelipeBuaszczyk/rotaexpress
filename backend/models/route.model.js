const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const Firm = require("./firm.model");

const Route = sequelize.define("routes", {
  id_route: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
});

Route.belongsTo(Firm, { foreignKey: "fk_id_firm", onDelete: "CASCADE" });
Firm.hasMany(Route, { foreignKey: "fk_id_firm" });

module.exports = Route;
