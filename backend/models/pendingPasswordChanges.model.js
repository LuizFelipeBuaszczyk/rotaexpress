const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const User = require("./user.model");


const PendingPasswordChange = sequelize.define("pending_password_change", {
  id_pending_password_change: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

//Criação de chave estrangeira
PendingPasswordChange.belongsTo(User, { 
    foreignKey: "fk_id_user", 
    onDelete: "CASCADE", 
});

User.hasMany(PendingPasswordChange, { 
    foreignKey: "fk_id_user" 
});

module.exports = PendingPasswordChange;
