const { mysqlConn } = require("../connections/mysql.js");
const DataTypes = require("sequelize");

const group = mysqlConn.define(
  "group",
  {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
      allowNull: false,
    },
  },
  { tableName: "group" }
);

module.exports = {
  group,
};
