function verifyIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  const iban = ibanInput.value.trim().replace(/\s+/g, '');
  const countryName = document.getElementById("countryName");
  const result = document.getElementById("result");
  const bankName = document.getElementById("bankName");

  if (iban.length < 2) {
    result.textContent = "Please enter a valid IBAN.";
    countryName.textContent = "";
    bankName.textContent = "";
    ibanInput.style.border = "2px solid red";
    return;
  }

  const countryCode = iban.substring(0, 2).toUpperCase();

  if (countries[countryCode]) {
    const expectedLength = countries[countryCode].length;
    countryName.innerHTML = `🌍<strong> Country: ${countries[countryCode].flag} ${countries[countryCode].name}</strong>`;

    if (iban.length !== expectedLength) {
      result.textContent = `⚠️ Invalid IBAN length. Expected ${expectedLength} characters.`;
      ibanInput.style.border = "2px solid red";
      bankName.textContent = "";
      return;
    }

    if (isValidIBAN(iban)) {
      result.textContent = "✅ Valid IBAN";
      ibanInput.style.border = "2px solid #4CAF50";
      detectCountry(iban);
      detectBank(iban); // now properly calling detectBank
    } else {
      result.textContent = "❌ Invalid IBAN";
      ibanInput.style.border = "2px solid #f44336";
      countryName.textContent = "";
      bankName.textContent = "";
    }

  } else {
    result.textContent = "❌ Unknown country code.";
    countryName.textContent = "";
    bankName.textContent = "";
    ibanInput.style.border = "2px solid red";
  }
}

function detectCountry(iban) {
  // (currently empty, but you might expand it later)
}

function detectBank(iban) {
  const bankName = document.getElementById("bankName");
  const cleanIban = iban.replace(/\s/g, '');

  if (cleanIban.startsWith("MT")) {
    const bankCode = cleanIban.substring(4, 8);

    let bank = "Unknown Bank";

    switch (bankCode) {
      case "VALL":
        bank = "Bank of Valletta (BOV)";
        break;
      case "LOMB":
        bank = "Lombard Bank Malta";
        break;
      case "APSB":
        bank = "APS Bank";
        break;
      case "BNIF":
        bank = "BNF Bank";
        break;
      case "MMEB":
        bank = "HSBC Malta";
        break;
      default:
        bank = "Unknown Bank";
    }

    bankName.textContent = `🏦 Bank: ${bank}`;
  } else {
    bankName.textContent = "";
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

document.getElementById("ibanInput").addEventListener("input", () => {
  formatIBAN();
  verifyIBAN();
});

function resetForm() {
  const ibanInput = document.getElementById("ibanInput");
  const countryName = document.getElementById("countryName");
  const result = document.getElementById("result");
  const bankName = document.getElementById("bankName");
  const copyMessage = document.getElementById("copyMessage");

  ibanInput.value = "";
  ibanInput.style.border = "1px solid #ccc";
  countryName.textContent = "";
  result.textContent = "";
  bankName.textContent = "";
  copyMessage.classList.remove('show');
}

function formatIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  let value = ibanInput.value.replace(/\s/g, '');
  value = value.replace(/(.{4})/g, '$1 ').trim();
  ibanInput.value = value.toUpperCase();
}
