// IBAN Verifier - Main Script
// Dark mode is handled by darkmode.js

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
    FO: { name: "Faroe Islands", length: 18, flag: "🇫🇴" },
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
    IL: { name: "Israel", length: 23, flag: "🇮🇱" },
    IT: { name: "Italy", length: 27, flag: "🇮🇹" },
    JO: { name: "Jordan", length: 30, flag: "🇯🇴" },
    KW: { name: "Kuwait", length: 30, flag: "🇰🇼" },
    LV: { name: "Latvia", length: 21, flag: "🇱🇻" },
    LB: { name: "Lebanon", length: 28, flag: "🇱🇧" },
    LI: { name: "Liechtenstein", length: 21, flag: "🇱🇮" },
    LT: { name: "Lithuania", length: 20, flag: "🇱🇹" },
    LU: { name: "Luxembourg", length: 20, flag: "🇱🇺" },
    MT: { name: "Malta", length: 31, flag: "🇲🇹" },
    MR: { name: "Mauritania", length: 27, flag: "🇲🇷" },
    MC: { name: "Monaco", length: 27, flag: "🇲🇨" },
    ME: { name: "Montenegro", length: 22, flag: "🇲🇪" },
    NL: { name: "Netherlands", length: 18, flag: "🇳🇱" },
    MK: { name: "North Macedonia", length: 19, flag: "🇲🇰" },
    NO: { name: "Norway", length: 15, flag: "🇳🇴" },
    PS: { name: "Palestine", length: 29, flag: "🇵🇸" },
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
    VA: { name: "Vatican City", length: 22, flag: "🇻🇦" },
  };

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
      detectBank(iban);
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

function detectBank(iban) {
  const bankNameEl = document.getElementById("bankName");
  const cleanIban = iban.replace(/\s/g, '');
  const countryCode = cleanIban.substring(0, 2);
  const bankCode = cleanIban.substring(4, 8);

  // Complete bank database with BIC/SWIFT codes
  // Format: { bankCode: { name: "Bank Name", bic: "BICCODE" } }
  const banksByCountry = {
    MT: { // Malta - All 17 Licensed Credit Institutions (Verified BIC codes)
      "VALL": { name: "Bank of Valletta P.L.C.", bic: "VALLMTMT" },
      "APSB": { name: "APS Bank Limited", bic: "APSBMTMT" },
      "MMEB": { name: "HSBC Bank Malta P.L.C.", bic: "MMEBMTMT" },
      "LOMB": { name: "Lombard Bank Malta P.L.C.", bic: "LBMAMTMT" },
      "BNIF": { name: "BNF Bank plc", bic: "BNIFMTMT" },
      "FIMB": { name: "FIMBank p.l.c.", bic: "FIMBMTM3" },
      "MEDR": { name: "MeDirect Bank (Malta) plc", bic: "MBWMMTMT" },
      "FCMF": { name: "FCM Bank Limited", bic: "FCMFMTMT" },
      "IIGB": { name: "IIG Bank (Malta) Ltd", bic: "IIGBMTMT" },
      "IZOL": { name: "Izola Bank P.L.C.", bic: "IZOLMTMT" },
      "VOCB": { name: "Novum Bank Limited", bic: "VOCBMTMT" },
      "AGRK": { name: "Lidion Bank Plc", bic: "AGRKMTMT" },
      "ECMB": { name: "ECCM Bank Plc", bic: "ECMBMTMT" },
      "FEMA": { name: "Multitude Bank P.L.C.", bic: "FEMAMTMT" },
      "SBMT": { name: "Sparkasse Bank Malta Plc", bic: "SBMTMTMT" },
      "ABNG": { name: "The Access Bank Malta Limited", bic: "ABNGMTMT" },
      "MFCB": { name: "MFC Merchant Bank Limited", bic: "MFCBMTMS" }
    },
    DE: { // Germany (BLZ codes)
      "3704": { name: "Commerzbank", bic: "COBADEFF" },
      "5001": { name: "Landesbank Hessen-Thüringen", bic: "HELADEFF" },
      "3707": { name: "Deutsche Bank", bic: "DEUTDEFF" },
      "1001": { name: "Postbank", bic: "PBNKDEFF" },
      "3003": { name: "ING-DiBa", bic: "INGDDEFF" },
      "7001": { name: "Deutsche Bundesbank", bic: "MARKDEFF" },
      "5005": { name: "Landesbank Baden-Württemberg", bic: "SOLADEST" }
    },
    GB: { // United Kingdom
      "NWBK": { name: "NatWest", bic: "NWBKGB2L" },
      "BARC": { name: "Barclays", bic: "BARCGB22" },
      "LOYD": { name: "Lloyds Bank", bic: "LOYDGB2L" },
      "HSBC": { name: "HSBC UK", bic: "HBUKGB4B" },
      "MIDL": { name: "HSBC UK", bic: "MIDLGB22" },
      "BUKB": { name: "Barclays UK", bic: "BUKBGB22" }
    },
    FR: { // France
      "2004": { name: "La Banque Postale", bic: "PSSTFRPP" },
      "3000": { name: "BNP Paribas", bic: "BNPAFRPP" },
      "1131": { name: "Crédit Agricole", bic: "AGRIFRPP" },
      "1027": { name: "Société Générale", bic: "SOGEFRPP" },
      "1830": { name: "CIC", bic: "CMCIFRPP" }
    },
    NL: { // Netherlands
      "ABNA": { name: "ABN AMRO", bic: "ABNANL2A" },
      "INGB": { name: "ING Bank", bic: "INGBNL2A" },
      "RABO": { name: "Rabobank", bic: "RABONL2U" },
      "TRIO": { name: "Triodos Bank", bic: "TRIONL2U" }
    },
    ES: { // Spain
      "2100": { name: "CaixaBank", bic: "CAIXESBB" },
      "0049": { name: "Santander", bic: "BSCHESMM" },
      "0182": { name: "BBVA", bic: "BBVAESMM" },
      "0075": { name: "Banco Popular", bic: "POPUESMM" }
    }
  };

  const countryBanks = banksByCountry[countryCode];
  if (countryBanks) {
    const bankInfo = countryBanks[bankCode];
    if (bankInfo) {
      bankNameEl.innerHTML = `🏦 <strong>${bankInfo.name}</strong><br>
        <span style="font-size: 0.9em; color: var(--text-muted);">BIC/SWIFT: <code style="background: var(--border-light); padding: 2px 6px; border-radius: 4px;">${bankInfo.bic}</code></span>`;
    } else {
      bankNameEl.textContent = "";
    }
  } else {
    bankNameEl.textContent = "";
  }
}

async function copyIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  const copyMessage = document.getElementById("copyMessage");

  try {
    await navigator.clipboard.writeText(ibanInput.value);
    copyMessage.classList.add('show');
    setTimeout(() => {
      copyMessage.classList.remove('show');
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    ibanInput.select();
    ibanInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copyMessage.classList.add('show');
    setTimeout(() => {
      copyMessage.classList.remove('show');
    }, 2000);
  }
}

function isValidIBAN(iban) {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const converted = rearranged.toUpperCase().replace(/[A-Z]/g, (char) => char.charCodeAt(0) - 55);
  const remainder = BigInt(converted) % 97n;
  return remainder === 1n;
}

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
  ibanInput.focus();
}

function formatIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  let value = ibanInput.value.replace(/\s/g, '');
  value = value.replace(/(.{4})/g, '$1 ').trim();
  ibanInput.value = value.toUpperCase();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const ibanInput = document.getElementById("ibanInput");

  if (ibanInput) {
    // Real-time formatting and verification
    ibanInput.addEventListener("input", () => {
      formatIBAN();
      verifyIBAN();
    });

    // Keyboard shortcuts
    ibanInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyIBAN();
      } else if (e.key === "Escape") {
        e.preventDefault();
        resetForm();
      }
    });
  }

  // Update footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
