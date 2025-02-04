"use strict";
const fs = require("fs");

/*
 * Rockyou as Singleton, lean and mean
 */
class Rockyou {
  static rockyou = ""; // 14.3 million bad passwords
  static #filename = "./rockyou.txt";

  static getRockyou() {
    if (Rockyou.rockyou === "")
      Rockyou.rockyou = fs.readFileSync(Rockyou.#filename, "utf8");
  }
}

module.exports = Rockyou;
