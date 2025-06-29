const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const User = require("./user.model");

const Notification = sequelize.define("notifications", {
  id_notification: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  table: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  fk_id_table: {
    type: DataTypes.UUID,
    allowNull: true
  }
});

//Criação de chave estrangeira
Notification.belongsTo(User, { foreignKey: "fk_id_user", onDelete: "CASCADE" });
User.hasMany(Notification, { foreignKey: "fk_id_user" });

module.exports = Notification;
