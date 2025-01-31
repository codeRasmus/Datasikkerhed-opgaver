const alphStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = alphStr.split("");

let decryptedText = [];
let encryptedText = [];

caesarE(Number(process.argv[2]), process.argv[3]);
caesarD(Number(process.argv[2]), process.argv[3]);

function caesarD(key, ciphertext) {
  if (isNaN(key)) {
    console.error(
      "Et tu, Brute? Is this a Caesar salad? Invalid key. Please provide a numeric value"
    );
    return;
  }

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

  console.log("Decrypted:", decryptedText.join(""));
}

function caesarE(key, cleartext) {
  if (isNaN(key)) {
    console.error(
      "Et tu, Brute? Is this a Caesar salad? Invalid key. Please provide a numeric value"
    );
    return;
  }

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

  console.log("Encrypted:", encryptedText.join(""));
}
