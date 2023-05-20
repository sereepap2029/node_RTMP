const { Model } = require("objection");
const Knex = require("knex");
const dbConfig = require("./config.js");
const m_stringlib = require("./m_stringlib.js");
const { createHash } = require("crypto");
const axios = require("axios").default;

// Initialize knex.
const knex = Knex(dbConfig);

// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Register extends Model {
  static get tableName() {
    return "register";
  }
  static get idColumn() {
    return "id";
  }
  static async getById(id) {
    let query = await this.query().where("id", id);
    //console.log(query);
    if (query.length == 1) {
      return query[0];
    } else {
      return false;
    }
  }
  static async getAll(filter={}, limit = 0, offset = 0) {
    let query = this.query();
    if (limit != 0) {
      query.limit(limit).offset(offset);
    }
    Object.keys(filter).forEach((key) => {
      query.where(key, "like", "%" + filter[key] + "%");
    });
    let result = await query;
    //console.log(query);
    if (result.length > 0) {
      return result;
    } else {
      return false;
    }
  }
  static async register(data) {
    let query = await this.query().insert(data);    
    if (query instanceof Register) {
      return query;
    } else {
      return false;
    }
  }

  static async updateById(id, data) {
    let numUpdated = await this.query().patch(data).where("id", "=", id);
    if (numUpdated == 1) {
      return true;
    } else {
      return false;
    }
  }
}
var exp = {};
function toInt(dat) {
  let result = parseInt(dat);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}
function toFloat(dat) {
  let result = parseFloat(dat);
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}
module.exports = { Register, exp };
