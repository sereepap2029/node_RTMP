const path = require("path");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const m_stringlib = require("../models/m_stringlib.js");
const m_register = require("../models/m_register.js");

var exp = {};

exp.home = (req, res) => {
  res.render(path.resolve("views", "home"));
};


function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
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
module.exports = exp;
