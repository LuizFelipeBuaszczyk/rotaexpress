const { DataTypes } = require("sequelize");
const sequelize = require("../bd/db");
const User = require("./user.model");
const Firm = require("./firm.model");

const Member = sequelize.define("members", {
  id_member: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

//Criação de chave estrangeira
Member.belongsTo(User, { foreignKey: "fk_id_user", onDelete: "CASCADE" });
User.hasMany(Member, { foreignKey: "fk_id_user" });

Member.belongsTo(Firm, { foreignKey: "fk_id_firm", onDelete: "CASCADE" });
Firm.hasMany(Member, { foreignKey: "fk_id_firm" })

module.exports = Member;
