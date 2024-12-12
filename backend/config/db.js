const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const { Sequelize } = require("@sequelize/core");
const { MsSqlDialect } = require("@sequelize/mssql");

const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: process.env.SERVERDB,
  port: parseInt(process.env.PORTDB, 10),
  database: process.env.DATABASE,
  authentication: {
    type: "default",
    options: {
      userName: process.env.USERNAMEDB,
      password: process.env.PASSWORDDB,
    },
  },
  encrypt: true,
  trustServerCertificate: true,
});

module.exports = sequelize;