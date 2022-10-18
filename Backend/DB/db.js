const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require("dotenv").config();
module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\`;`
  );

  // connect to db
  const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD,
    { dialect: "mysql" }
  );

  // init models and add them to the exported db object
  db.User = require("../Modal/authModal")(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });
}
