function verifyIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  const iban = ibanInput.value.trim().replace(/\s+/g, '');
  const countryName = document.getElementById("countryName");
  const result = document.getElementById("result");

  if (iban.length < 2) {
    result.textContent = "Please enter a valid IBAN.";
    countryName.textContent = "";
    ibanInput.style.border = "2px solid red";
    return;
  }

  const countryCode = iban.substring(0, 2).toUpperCase();

  const countries = {
    MT: { name: "Malta", length: 31 },
    DE: { name: "Germany", length: 22 },
    FR: { name: "France", length: 27 },
    IT: { name: "Italy", length: 27 },
    ES: { name: "Spain", length: 24 },
    GB: { name: "United Kingdom", length: 22 },
  };

  if (countries[countryCode]) {
    const expectedLength = countries[countryCode].length;
    countryName.textContent = "🌍 Country: " + countries[countryCode].name;

    if (iban.length !== expectedLength) {
      result.textContent = `⚠️ Invalid IBAN length. Expected ${expectedLength} characters.`;
      ibanInput.style.border = "2px solid red";
      return;
    }

    if (isValidIBAN(iban)) {
      result.textContent = "✅ Valid IBAN!";
      ibanInput.style.border = "2px solid green";
    } else {
      result.textContent = "❌ Invalid IBAN checksum.";
      ibanInput.style.border = "2px solid red";
    }
  } else {
    result.textContent = "❌ Unknown country code.";
    countryName.textContent = "";
    ibanInput.style.border = "2px solid red";
  }
}
function copyIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  const copyMessage = document.getElementById("copyMessage");

  ibanInput.select();
  ibanInput.setSelectionRange(0, 99999);
  document.execCommand("copy");

  copyMessage.classList.add('show');

  setTimeout(() => {
    copyMessage.classList.remove('show');
  }, 2000);
}
function isValidIBAN(iban) {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const converted = rearranged.toUpperCase().replace(/[A-Z]/g, (char) => char.charCodeAt(0) - 55);
  const remainder = BigInt(converted) % 97n;
  return remainder === 1n;
}
document.getElementById("ibanInput").addEventListener("input", verifyIBAN);
function resetForm() {
  const ibanInput = document.getElementById("ibanInput");
  const countryName = document.getElementById("countryName");
  const result = document.getElementById("result");
  const copyMessage = document.getElementById("copyMessage");

  ibanInput.value = "";
  ibanInput.style.border = "1px solid #ccc"; // reset to normal
  countryName.textContent = "";
  result.textContent = "";
  copyMessage.classList.remove('show');
}