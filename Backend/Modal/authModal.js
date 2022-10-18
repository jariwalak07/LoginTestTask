const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: true },
  };
  const options = {
    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      withHash: { attributes: {} },
    },
  };
  return sequelize.define("User", attributes, options);
}
module.exports = model;
