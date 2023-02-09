const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const expressValidator = require("express-validator");
const mysql = require("mysql2");
const { log } = require("console");

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

// Server Listening
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  let sql = "SELECT * FROM patients";
  let sqlapp = "SELECT * FROM appointments";
  connection.query(sql, sqlapp, (err, rows) => {
    if (err) throw err;
    res.render("user_index", {
      title: "gestion des patients",
      patients: rows,
    });
  });
});

// Add Patient Form
app.get("/add", (req, res) => {
  // render to views/product/add.ejs
  res.render("add", {
    title: "Add New Patient",
    nom: "",
    prenom: "",
    sexe: "",
    age: "",
  });
});

// Add Patient Data
app.post("/add", function (req, res) {
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var sexe = req.body.sexe;
  var age = req.body.age;

  // insert query get data
  let insertQuery = `INSERT INTO patients (nom,prenom,sexe,age) VALUES ("${nom}", "${prenom}", "${sexe}", "${age}")`;

  connection.query(insertQuery, function (error, result) {
    console.log("patient %s ajouter", prenom);
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  let deleteQuery = `DELETE FROM  patients WHERE id = ${id};`;

  connection.query(deleteQuery, function (error, result) {
    console.log("patient supprimer");
    res.redirect("/");
  });
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  let editQuery = `SELECT * FROM patients WHERE id = ${id};`;

  let query = connection.query(editQuery, (err, rows) => {
    if (err) throw err;

    res.render("edit", {
      title: "gestion des patients",
      patient: rows[0],
      id: id,
    });
  });
});

app.post("/edit/:id", function (req, res) {
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var sexe = req.body.sexe;
  var age = req.body.age;
  var id = req.params.id;
  // insert query get data product
  // let insertQuery = `INSERT INTO patients (nom,prenom,sexe,age) VALUES ("${nom}", "${prenom}", "${sexe}", "${age}")`;
  let editQuery = `UPDATE  patients SET nom =  "${nom}", prenom="${prenom}", sexe= "${sexe}", age= "${age}" WHERE id= ${id}`;

  connection.query(editQuery, function (error, result) {
    console.log("patient %s modifier", prenom);
    res.redirect("/");
  });
});

//rendez vous
app.get("/red_add/:id", (req, res) => {
  // render to views/product/add.ejs
  const id = req.params.id;
  res.render("red_add", {
    title: "Add New appointement",
    date: "",
    heure: "",
    id,
  });
});

// Add Patient Data
app.post("/red_add/:id", function (req, res) {
  const id = req.params.id;
  var date = req.body.date;
  var heure = req.body.heure;

  // insert query get data
  let red_addQuery = `INSERT INTO appointments (patient_id, appointment_date ,appointment_slot )
   VALUES ("${id}", "${date}", "${heure}")`;

  connection.query(red_addQuery, function (error, result) {
    if (error) {
      console.log("problem de requete");
    }
    console.log("rendez-vous ajouter");
    res.redirect("/");
  });
});
