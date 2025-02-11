"use strict";
const readlineSync = require("readline-sync"); // Input fra CLI
const Rock = require("./rockyou.js"); // Import Rockyou Singleton
const fs = require("fs"); // FS module for writing to file
const sqlite3 = require("sqlite3").verbose(); // SQLite3 module
const bcrypt = require("bcrypt"); // bcrypt module

if (process.argv.length < 3) {
  console.error("Brug: node script.js <rockyou.txt>");
  process.exit(1);
}

const db = new sqlite3.Database("users.db", (err) => {
  if (err) {
    console.error("Fejl ved oprettelse af database", err.message);
    process.exit(1);
  }
  console.log("Connected to the users database.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS user (
id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid TEXT NOT NULL,
    password TEXT NOT NULL
)`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log('Table "user" is ready.');

      addUser();
    }
  }
);

const username = readlineSync.question("Indtast brugernavn: "); // username fra CLI
let password = readlineSync.question("Indtast password: ", {
  hideEchoBack: true,
}); // password fra CLI
const leakedPasswords = process.argv[2]; // valgte passwords-fil fra CLI

console.log(
  `Tjekker om dit password, ${
    password || "(ikke indtastet endnu)"
  } findes i filen ${leakedPasswords}`
);

function addUser() {
  try {
    // Initialiser Rockyou Singleton
    Rock.getRockyou(); // Indlæser filen én gang

    // Tjek om password findes i Rockyou-listen
    if (Rock.rockyou.includes(password)) {
      console.log(
        `🆘 Not good enough, ${username} try again. Your password was leaked in ${process.argv[2]}`
      );
    } else {
      console.log(
        `✅ You chose wisely, ${username}! Your password was not found among all the leaked ones in ${process.argv[2]}`
      );
      // Generate a salt manually
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error("Fejl ved generering af salt", err.message);
          process.exit(1);
        }

        // Hash the password with the generated salt
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            console.error("Fejl ved hashing af password", err.message);
            process.exit(1);
          } else {
            const stmt = db.prepare(
              "INSERT INTO user (userid, password) VALUES (?, ?)"
            );
            stmt.run(username, hash, function (err) {
              if (err) {
                console.error("Error inserting data:", err.message);
              } else {
                console.log("User successfully stored in the database.");
              }
              stmt.finalize();

              // Luk databasen
              db.close((err) => {
                if (err) {
                  console.error("Error closing database:", err.message);
                } else {
                  console.log("Database connection closed.");
                }
              });
            });
          }
        });
      });
    }
  } catch (error) {
    console.error("Fejl:", error.message);
    process.exit(1);
  }
}
