import { mysqlConn } from "../connections/mysql.js";
import DataTypes from "sequelize";

export const userGroup = mysqlConn.define(
  "user_group",
  {
    userId: {
      type: DataTypes.BIGINT,
      field: "user_id",
      allowNull: false
    },
    groupId: {
      type: DataTypes.BIGINT,
      field: "group_id",
      allowNull: false
    },
    isApprove: {
      type: DataTypes.BOOLEAN,
      field: "is_approve",
      allowNull: false,
      defaultValue: false
    }
  },
  { tableName: "user_group" }
);