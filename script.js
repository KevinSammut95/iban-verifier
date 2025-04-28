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

  const countries = {
  AL: { name: "Albania", length: 28, flag: "🇦🇱" },
  AD: { name: "Andorra", length: 24, flag: "🇦🇩" },
  AT: { name: "Austria", length: 20, flag: "🇦🇹" },
  AZ: { name: "Azerbaijan", length: 28, flag: "🇦🇿" },
  BH: { name: "Bahrain", length: 22, flag: "🇧🇭" },
  BE: { name: "Belgium", length: 16, flag: "🇧🇪" },
  BA: { name: "Bosnia and Herzegovina", length: 20, flag: "🇧🇦" },
  BR: { name: "Brazil", length: 29, flag: "🇧🇷" },
  BG: { name: "Bulgaria", length: 22, flag: "🇧🇬" },
  CR: { name: "Costa Rica", length: 22, flag: "🇨🇷" },
  HR: { name: "Croatia", length: 21, flag: "🇭🇷" },
  CY: { name: "Cyprus", length: 28, flag: "🇨🇾" },
  CZ: { name: "Czech Republic", length: 24, flag: "🇨🇿" },
  DK: { name: "Denmark", length: 18, flag: "🇩🇰" },
  DO: { name: "Dominican Republic", length: 28, flag: "🇩🇴" },
  EE: { name: "Estonia", length: 20, flag: "🇪🇪" },
  FI: { name: "Finland", length: 18, flag: "🇫🇮" },
  FR: { name: "France", length: 27, flag: "🇫🇷" },
  GE: { name: "Georgia", length: 22, flag: "🇬🇪" },
  DE: { name: "Germany", length: 22, flag: "🇩🇪" },
  GI: { name: "Gibraltar", length: 23, flag: "🇬🇮" },
  GR: { name: "Greece", length: 27, flag: "🇬🇷" },
  GL: { name: "Greenland", length: 18, flag: "🇬🇱" },
  GT: { name: "Guatemala", length: 28, flag: "🇬🇹" },
  HU: { name: "Hungary", length: 28, flag: "🇭🇺" },
  IS: { name: "Iceland", length: 26, flag: "🇮🇸" },
  IE: { name: "Ireland", length: 22, flag: "🇮🇪" },
  IT: { name: "Italy", length: 27, flag: "🇮🇹" },
  JO: { name: "Jordan", length: 30, flag: "🇯🇴" },
  KZ: { name: "Kazakhstan", length: 20, flag: "🇰🇿" },
  XK: { name: "Republic of Kosovo", length: 20, flag: "🇽🇰" },
  KW: { name: "Kuwait", length: 30, flag: "🇰🇼" },
  LV: { name: "Latvia", length: 21, flag: "🇱🇻" },
  LB: { name: "Lebanon", length: 28, flag: "🇱🇧" },
  LI: { name: "Liechtenstein", length: 21, flag: "🇱🇮" },
  LT: { name: "Lithuania", length: 20, flag: "🇱🇹" },
  LU: { name: "Luxembourg", length: 20, flag: "🇱🇺" },
  MK: { name: "North Macedonia", length: 19, flag: "🇲🇰" },
  MT: { name: "Malta", length: 31, flag: "🇲🇹" },
  MR: { name: "Mauritania", length: 27, flag: "🇲🇷" },
  MU: { name: "Mauritius", length: 30, flag: "🇲🇺" },
  MD: { name: "Moldova", length: 24, flag: "🇲🇩" },
  MC: { name: "Monaco", length: 27, flag: "🇲🇨" },
  ME: { name: "Montenegro", length: 22, flag: "🇲🇪" },
  NL: { name: "Netherlands", length: 18, flag: "🇳🇱" },
  NO: { name: "Norway", length: 15, flag: "🇳🇴" },
  PL: { name: "Poland", length: 28, flag: "🇵🇱" },
  PT: { name: "Portugal", length: 25, flag: "🇵🇹" },
  QA: { name: "Qatar", length: 29, flag: "🇶🇦" },
  RO: { name: "Romania", length: 24, flag: "🇷🇴" },
  SM: { name: "San Marino", length: 27, flag: "🇸🇲" },
  SA: { name: "Saudi Arabia", length: 24, flag: "🇸🇦" },
  RS: { name: "Serbia", length: 22, flag: "🇷🇸" },
  SK: { name: "Slovakia", length: 24, flag: "🇸🇰" },
  SI: { name: "Slovenia", length: 19, flag: "🇸🇮" },
  ES: { name: "Spain", length: 24, flag: "🇪🇸" },
  SE: { name: "Sweden", length: 24, flag: "🇸🇪" },
  CH: { name: "Switzerland", length: 21, flag: "🇨🇭" },
  TN: { name: "Tunisia", length: 24, flag: "🇹🇳" },
  TR: { name: "Turkey", length: 26, flag: "🇹🇷" },
  AE: { name: "United Arab Emirates", length: 23, flag: "🇦🇪" },
  GB: { name: "United Kingdom", length: 22, flag: "🇬🇧" },
  VG: { name: "Virgin Islands, British", length: 24, flag: "🇻🇬" }
};

  if (countries[countryCode]) {
    const expectedLength = countries[countryCode].length;
    countryName.textContent = "🌍 Country: " + `${countries[countryCode].flag} ${countries[countryCode].name}`;

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

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}
