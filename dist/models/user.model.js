"use strict";

var _require = require('sequelize'),
  DataTypes = _require.DataTypes;
var sequelize = require('../data-access/database.js');
var User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    validate: {
      notNull: true,
      notEmpty: true
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notNull: true,
      isAlphanumeric: {
        msg: "password must contain letters and numbers"
      }
    },
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      notNull: true,
      min: 4,
      max: 130,
      isInt: {
        msg: "Age must be number"
      }
    },
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    validate: {
      notNull: true
    },
    allowNull: false
  }
}, {
  timestamps: false
});
module.exports = User;