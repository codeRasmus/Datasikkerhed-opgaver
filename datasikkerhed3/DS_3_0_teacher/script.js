// Importerer bcrypt.js til hashing af adgangskoder
const bcrypt = require("bcryptjs");

// Importerer better-sqlite3 til at håndtere SQLite-databasen
const sqlite3 = require("better-sqlite3");

// Importerer en brugerdefineret Rockyou-modul, sandsynligvis til at tjekke svage adgangskoder
const Rockyou = require("./rockyou.js");

// Henter argumenter fra kommandolinjen
const argv = process.argv;
const argc = argv.length;

// Opretter forbindelse til SQLite-databasen "test.db"
const db = new sqlite3("test.db");

// Funktion til at registrere en bruger i databasen
const register = function (user, pwd) {
  // Hasher adgangskoden ved hjælp af bcrypt
  let hash = bcrypt.hashSync(pwd);

  try {
    // Forbereder en SQL-forespørgsel til at indsætte en ny bruger
    let sql = "insert into user(userid, password) values(?, ?)";
    let stmt = db.prepare(sql);

    // Kører forespørgslen med bruger-id og den hash’ede adgangskode
    stmt.run(user, hash);

    return true; // Returnerer true, hvis indsættelsen lykkes
  } catch (err) {
    // Udskriver fejlmeddelelsen, hvis der opstår en databasefejl
    console.log(`${err.message}`);
    return false;
  }
};

// Henter brugernavn og adgangskode fra kommandolinjeargumenter
let entereduser = argv[2];
let enteredpassword = argv[3];

// Opretter en ny instans af Rockyou-klassen, sandsynligvis for at tjekke svage adgangskoder
let rockyou = new Rockyou();

// Tjekker om adgangskoden findes i Rockyou-databasen (er for svag)
let exists = rockyou.search(enteredpassword);

if (!exists) {
  // Hvis adgangskoden ikke er for svag, forsøges registrering af brugeren
  let res = register(entereduser, enteredpassword);

  if (!res) {
    console.log("db error"); // Fejl ved databaseindsættelse
  } else {
    console.log("You chose wisely"); // Registrering lykkedes
  }
} else {
  console.log("inadequate password"); // Adgangskoden er for svag
}

// Lukker databaseforbindelsen
db.close();
