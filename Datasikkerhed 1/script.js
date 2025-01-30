const alphStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = alphStr.split("");

let encryptedText = []; // Declare for use in caesarE and caesarD
let decryptedText = []; // Declare for use in caesarE and caesarD

function processCipher(action, cipherType) {
  const key = document.getElementById("key").value;
  const text = document.getElementById("text").value;

  if (key && text) {
    if (cipherType === "vigenere") {
      if (action === "encrypt") {
        vigE(key, text);
      } else if (action === "decrypt") {
        vigD(key, text);
      }
    } else if (cipherType === "caesar") {
      if (action === "encrypt") {
        caesarE(key, text);
      } else if (action === "decrypt") {
        caesarD(key, text);
      }
    }
  } else {
    alert("Please provide both key and text.");
  }
}

function vigE(key, clearText) {
  let encryptedText = [];
  let shift = [];

  for (let i = 0; i < key.length; i++) {
    const letter = key[i].toUpperCase();
    shift.push(alphabet.indexOf(letter));
  }

  let keyIndex = 0;
  for (let i = 0; i < clearText.length; i++) {
    const char = clearText[i].toUpperCase();

    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const shiftValue = shift[keyIndex % shift.length];
      const encryptedCharIndex = (charIndex + shiftValue) % alphabet.length;
      const encryptedChar = alphabet[encryptedCharIndex];
      encryptedText.push(encryptedChar);
      keyIndex++;
    } else {
      encryptedText.push(char);
    }
  }

  document.getElementById("result").value = encryptedText.join("");
}

function vigD(key, clearText) {
  let decryptedText = [];
  let shift = [];

  for (let i = 0; i < key.length; i++) {
    const letter = key[i].toUpperCase();
    shift.push(alphabet.indexOf(letter));
  }

  let keyIndex = 0;
  for (let i = 0; i < clearText.length; i++) {
    const char = clearText[i].toUpperCase();

    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const shiftValue = shift[keyIndex % shift.length];
      const decryptedCharIndex =
        (charIndex - shiftValue + alphabet.length) % alphabet.length;
      const decryptedChar = alphabet[decryptedCharIndex];
      decryptedText.push(decryptedChar);
      keyIndex++;
    } else {
      decryptedText.push(char);
    }
  }

  document.getElementById("result").value = decryptedText.join("");
}

function caesarD(key, ciphertext) {
  if (isNaN(key)) {
    console.error(
      "Et tu, Brute? Is this a Caesar salad? Invalid key. Please provide a numeric value"
    );
    return;
  }

  decryptedText = []; // Reset the array for each operation

  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext.charAt(i).toUpperCase();
    if (alphabet.includes(char)) {
      const originalIndex = alphabet.indexOf(char);
      const newIndex =
        (originalIndex - key + alphabet.length) % alphabet.length;
      decryptedText.push(alphabet[newIndex]);
    } else {
      decryptedText.push(char);
    }
  }

  document.getElementById("result").value = decryptedText.join("");
}

function caesarE(key, cleartext) {
  if (isNaN(key)) {
    console.error(
      "Et tu, Brute? Is this a Caesar salad? Invalid key. Please provide a numeric value"
    );
    return;
  }

  encryptedText = []; // Reset the array for each operation

  for (let i = 0; i < cleartext.length; i++) {
    const char = cleartext.charAt(i).toUpperCase();
    if (alphabet.includes(char)) {
      const originalIndex = alphabet.indexOf(char);
      const newIndex = (originalIndex + key) % alphabet.length;
      encryptedText.push(alphabet[newIndex]);
    } else {
      encryptedText.push(char);
    }
  }

  document.getElementById("result").value = encryptedText.join("");
}
