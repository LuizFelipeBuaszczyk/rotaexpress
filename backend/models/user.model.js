const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");

const User = sequelize.define("users", {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
});

module.exports = User;
