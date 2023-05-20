const _ = require("lodash");
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const session = require("express-session");
const Knex = require("knex");
const KnexSessionStore = require("connect-session-knex")(session);
require("dotenv").config();
process.env.TZ = process.env.TIME_ZONE;

// Routes import
const routeHome = require("./routes/home.js");

const app = express();
//setup views EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setup static and middleware
app.use("/css", express.static(path.resolve("node_modules", "bootstrap", "dist", "css")));
app.use("/js", express.static(path.resolve("node_modules", "bootstrap", "dist", "js")));
app.use("/js", express.static(path.resolve("node_modules", "axios", "dist")));
app.use("/js", express.static(path.resolve("node_modules", "flv.js", "dist")));
app.use("/js", express.static(path.resolve("node_modules", "jquery", "dist")));
app.use("/", express.static(path.resolve("public")));
app.use("/css", express.static(path.resolve("public/css")));
app.use("/js", express.static(path.resolve("public/js")));
app.use("/img", express.static(path.resolve("public/img")));
app.use("/fonts", express.static(path.resolve("public/fonts")));
app.use("/webfonts", express.static(path.resolve("public/webfonts")));
app.use("/media", express.static(path.resolve("public/media")));

// set accept parameter and json request
app.use("/", express.urlencoded({ extended: false, limit: "500mb", parameterLimit: 1000000 }));
app.use("/", express.json({ limit: "500mb" }));

// init Knex and session
const knex = Knex({
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
});
sessionStoreOptions = {
  knex: knex,
  createtable: true,
};
const store = new KnexSessionStore(sessionStoreOptions);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use("/", routeHome);

//listen
app.listen(process.env.WEB_PORT, () => {
  console.log(`Server running at http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`);
});
