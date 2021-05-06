import { mysqlConn } from "../connections/mysql.js";
import DataTypes from "sequelize";

export const group = mysqlConn.define(
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
      unique: true
    },
  },
  { tableName: "group" }
);
