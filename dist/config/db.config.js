"use strict";

var db = require('../../constants/db.constants');
module.exports = {
  HOST: db.host,
  USER: db.user,
  PASSWORD: db.password,
  DB: db.name,
  dialect: db.dialect,
  pool: {
    max: db.max_pool,
    min: db.min_pool,
    acquire: db.acquire_pool,
    idle: db.idle_pool
  }
};