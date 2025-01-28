const alphStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = alphStr.split("");

let encryptedText = [];
let decryptedText = [];

console.log("You have chosen key:", process.argv[2]);
if (process.argv[4]) {
  if (process.argv[4] === "decrypt") {
    vigD(process.argv[2], process.argv[3]);
  } else if (process.arg[4] === "encrypt") {
    vigE(process.argv[2], process.argv[3]);
  }
  {
  }
}

function vigE(key, clearText) {
  if (typeof key !== "string") {
    console.error("Please provide a stringbased key");
    return;
  }

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

  console.log("Encrypted text:", encryptedText.join(""));
}
function vigD(key, clearText) {
  if (typeof key !== "string") {
    console.error("Please provide a stringbased key");
    return;
  }

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

  console.log("Decrypted text:", decryptedText.join(""));
}
