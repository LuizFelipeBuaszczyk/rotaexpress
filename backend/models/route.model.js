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
});

Route.belongsTo(Firm, { foreignKey: "fk_id_firm" });
Firm.hasMany(Route, { foreignKey: "fk_id_firm" });

module.exports = Route;
