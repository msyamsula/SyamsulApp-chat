const { mysqlConn } = require("../connections/mysql.js");
const DataTypes = require("sequelize");

const userGroup = mysqlConn.define(
  "user_group",
  {
    userId: {
      type: DataTypes.BIGINT,
      field: "user_id",
      allowNull: false,
    },
    groupId: {
      type: DataTypes.BIGINT,
      field: "group_id",
      allowNull: false,
    },
  },
  { tableName: "user_group" }
);

module.exports = {
  userGroup,
};
