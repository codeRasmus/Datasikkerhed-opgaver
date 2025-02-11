"use strict";
const readlineSync = require("readline-sync");
const Rock = require("./rockyou.js");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");

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
  db.run(`
  CREATE TABLE IF NOT EXISTS user256 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid VARCHAR(32) UNIQUE NOT NULL,
    password BLOB NOT NULL,
    comments TEXT NOT NULL
  )
`);
  console.log("Database is ready.");
  mainMenu();
});

function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

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
    const comments = "";

    Rock.getRockyou();

    if (Rock.rockyou.includes(password)) {
      console.log(
        `🆘 Not good enough, ${userid}. Prøv igen. Dit password er lækket.`
      );
      return addUser();
    } else {
      console.log(
        `You chose wisely, ${userid}!\n Your password was not found among all the leaked ones.`
      );
    }

    db.get("SELECT * FROM user256 WHERE userid = ?", [userid], (err, row) => {
      if (err) {
        console.error("Fejl ved databaseforespørgsel:", err.message);
        return;
      }

      if (row) {
        console.log("⛔ Brugernavnet er allerede taget, vælg et andet.");
        return mainMenu();
      }

      const hashedPassword = hashPassword(password);
      const stmt = db.prepare(
        "INSERT INTO user256 (userid, password, comments) VALUES (?, ?, ?)"
      );

      stmt.run(userid, hashedPassword, comments, function (err) {
        if (err) {
          console.error("Fejl ved indsættelse af bruger:", err.message);
          return;
        }

        console.log("✅ Bruger oprettet.");
        stmt.finalize(() => mainMenu());
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
    "SELECT id, password FROM user256 WHERE userid = ?",
    [userid],
    (err, row) => {
      if (!row) {
        console.log("⛔ Bruger findes ikke.");
        return mainMenu();
      }

      // Hash den indtastede adgangskode og sammenlign
      const hashedPassword = hashPassword(password);

      if (hashedPassword === row.password) {
        console.log(
          `Login succesfuldt! Velkommen, ${userid}.\n Dit bruger-ID er: ${row.id}`
        );
        mainMenu();
      } else {
        console.log("⛔ Forkert password.");
      }
    }
  );
}

function printAllUsers() {
  db.all(
    "SELECT id, userid, password, comments FROM user256",
    [],
    (err, rows) => {
      if (err) {
        console.error("Fejl ved forespørgsel:", err.message);
        return;
      }

      if (rows.length === 0) {
        console.log("Ingen brugere i databasen.");
      } else {
        console.log("Brugere i databasen:\n");
        rows.forEach((row) => {
          console.log(
            `ID: ${row.id}, Brugernavn: ${row.userid}, Kommentar: ${row.comments}`
          );
        });
      }
      mainMenu();
    }
  );
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
