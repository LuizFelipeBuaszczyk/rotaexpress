const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const User = require("./user.model");

const Firm = sequelize.define("firms", {
  id_firm: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

//Criação de chave estrangeira
Firm.belongsTo(User, { foreignKey: "fk_id_user", onDelete: "CASCADE" });
User.hasMany(Firm, { foreignKey: "fk_id_user" });

module.exports = Firm;
