// import { Sequelize } from "sequelize";
const { Sequelize } = require("sequelize");
const uri = process.env.MYSQL_URI;

const mysqlConn = new Sequelize(uri, {
  define: {
    freezeTableName: true,
    timestamps: false,
    omitNull: true,
  },
  pool: {
    max: 5,
    min: 3,
    acquire: 30000,
    idle: 10000,
  },
});

const mysqlConnect = async (conn) => {
  // console.log(uri);
  await conn.authenticate();
};

module.exports = {
  mysqlConnect,
  mysqlConn,
};
