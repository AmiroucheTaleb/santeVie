// import mysql from "mysql2";

// mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "13171519",
//   database: "santevie",
// }).promise;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "13171519",
  database: "santevite",
});

connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database Connected!");
});
