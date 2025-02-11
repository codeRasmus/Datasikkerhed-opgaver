"use strict";
const fs = require("fs");

/*
 * Rockyou as Singleton, lean and mean
 */
class Rockyou {
  static rockyou = null; // Store passwords as a Set for fast lookup
  static #filename = "./rockyou.txt";

  static getRockyou() {
    if (!Rockyou.rockyou) {
      const data = fs.readFileSync(Rockyou.#filename, "utf8");
      Rockyou.rockyou = new Set(data.split("\n")); // Store as a Set for O(1) lookup
    }
  }

  search(word) {
    Rockyou.getRockyou();
    return Rockyou.rockyou.has(word);
  }
}

module.exports = Rockyou;
