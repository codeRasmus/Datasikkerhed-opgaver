"use strict";
const readlineSync = require("readline-sync");
const Rock = require("./rockyou.js");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

// Check if the database file exists
if (!fs.existsSync("users.db")) {
  console.log("Database does not exist. Creating database...");
} else {
  console.log("Database exists. ✅");
  console.log("Proceeding...");
}

const db = new sqlite3.Database("users.db", (err) => {
  if (err) {
    console.error("Fejl ved oprettelse af database", err.message);
    process.exit(1);
  }
});

db.serialize(() => {
  // Ensure the table is created if it doesn't already exist
  db.run(
    `CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userid TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`
  );

  console.log("Database is ready.");
  mainMenu();
});

function addUser() {
  try {
    const userid = readlineSync.question("Indtast brugernavn: ");
    if (!/^[a-zA-Z0-9_]+$/.test(userid)) {
      console.log(
        "❌ Invalid username. Only letters, numbers and underscores are allowed."
      );
      return addUser();
    }
    let password = readlineSync.question("Indtast password: ", {
      hideEchoBack: true,
    });
    const leakedPasswords = "rockyou.txt";

    // Initialiser Rockyou Singleton
    Rock.getRockyou();

    // Tjek om password findes i Rockyou-listen
    if (Rock.rockyou.includes(password)) {
      console.log(
        `🆘 Not good enough, ${userid} try again. Your password is leaked in ${leakedPasswords}`
      );
      return addUser();
    } else {
      console.log(
        `You chose wisely, ${userid}!\n Your password was not found among all the leaked ones.`
      );
    }

    // Tjek om brugernavn allerede eksisterer
    db.get("SELECT * FROM user WHERE userid = ?", [userid], (err, row) => {
      if (row) {
        console.log(
          "⛔ Brugernavnet er allerede taget, vælg venligst et andet."
        );
        return;
      }

      // Generate a salt manually
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error("Fejl ved generering af salt", err.message);
          process.exit(1);
        }

        // Hash password
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error("Fejl ved hashing af password", err.message);
            process.exit(1);
          } else {
            const stmt = db.prepare(
              "INSERT INTO user (userid, password) VALUES (?, ?)"
            );
            stmt.run(userid, hash, function (err) {
              if (err) {
                console.error("Error inserting data:", err.message);
              }
              stmt.finalize();
            });
            console.log(`Bruger ${userid} oprettet...`);
            mainMenu();
          }
        });
      });
    });
  } catch (error) {
    console.error("Fejl:", error.message);
  }
}

function loginUser() {
  const userid = readlineSync.question("Indtast brugernavn: ");
  if (!/^[a-zA-Z0-9_]+$/.test(userid)) {
    console.log("❌ Invalid username format.");
    return loginUser();
  }
  let password = readlineSync.question("Indtast password: ", {
    hideEchoBack: true,
  });

  db.get(
    "SELECT id, password FROM user WHERE userid = ?",
    [userid],
    (err, row) => {
      if (!row) {
        console.log("⛔ Bruger findes ikke.");
        return mainMenu();
      }

      bcrypt.compare(password, row.password, (err, res) => {
        if (err) {
          console.error("Fejl ved sammenligning af password:", err.message);
          return;
        }
        if (res) {
          console.log(
            `Login succesfuldt!\n Velkommen, "${userid}".\n Dit bruger-ID er: ${row.id}`
          );
          mainMenu();
        } else {
          console.log("⛔ Forkert password.");
        }
      });
    }
  );
}

function printAllUsers() {
  db.all("SELECT id, userid, password FROM user", [], (err, rows) => {
    if (err) {
      console.error("Fejl ved forespørgsel:", err.message);
      return;
    }

    if (rows.length === 0) {
      console.log("Ingen brugere i databasen.");
    } else {
      console.log("Brugere i databasen:");
      rows.forEach((row) => {
        console.log(
          `ID: ${row.id}, Brugernavn: ${row.userid}, Password: ${row.password}`
        );
      });
    }
    mainMenu();
  });
}

// Main menu function
function mainMenu() {
  const choice = readlineSync.question(
    "\nVil du:\n (1) Oprette en bruger\n (2) Logge ind\n (3) Udskrive alle brugere\n (4) Afslut\n"
  );

  if (choice === "1") {
    addUser();
  } else if (choice === "2") {
    loginUser();
  } else if (choice === "3") {
    printAllUsers();
  } else if (choice === "4") {
    console.log("Over and out...");
    db.close();
  }
}
