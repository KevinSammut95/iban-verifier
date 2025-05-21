/**
 * Verifies the entered IBAN.
 * It checks the country code, IBAN length, and performs checksum validation.
 * Updates the UI with the validation result, country information, and bank details if available.
 */
function verifyIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  const iban = ibanInput.value.trim().replace(/\s+/g, ''); // Clean and remove spaces
  const countryName = document.getElementById("countryName");
  const result = document.getElementById("result");
  const bankName = document.getElementById("bankName");

  // Basic check for minimum IBAN length
  if (iban.length < 2) {
    result.textContent = "Please enter a valid IBAN.";
    countryName.textContent = "";
    bankName.textContent = "";
    ibanInput.style.border = "2px solid red";
    return;
  }

  const countryCode = iban.substring(0, 2).toUpperCase();

  // In-function country data store (consider moving to a more global/shared scope if used elsewhere)
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

  // Check if the extracted country code is known
  if (countries[countryCode]) {
    const expectedLength = countries[countryCode].length;
    countryName.innerHTML = `🌍<strong> Country: ${countries[countryCode].flag} ${countries[countryCode].name}</strong>`;

    // Verify if the IBAN length matches the expected length for the country
    if (iban.length !== expectedLength) {
      result.textContent = `⚠️ Invalid IBAN length. Expected ${expectedLength} characters.`;
      ibanInput.style.border = "2px solid red";
      bankName.textContent = ""; // Clear bank name on error
      return;
    }

    // Perform checksum validation using the ISO 7064 MOD-97-10 algorithm
    if (isValidIBAN(iban)) {
      result.textContent = "✅ Valid IBAN";
      ibanInput.style.border = "2px solid #4CAF50"; // Green border for valid
      // detectCountry(iban); // This function was empty and has been removed
      detectBank(iban); // Attempt to detect bank information
    } else {
      result.textContent = "❌ Invalid IBAN";
      ibanInput.style.border = "2px solid #f44336"; // Red border for invalid
      countryName.textContent = ""; // Clear country name on error
      bankName.textContent = "";   // Clear bank name on error
    }

  } else {
    result.textContent = "❌ Unknown country code.";
    countryName.textContent = "";
    bankName.textContent = "";
    ibanInput.style.border = "2px solid red";
  }
}

/**
 * Detects the bank name based on the IBAN, currently specific to Maltese (MT) IBANs.
 * It extracts the bank code from the IBAN and matches it against a known list.
 * @param {string} iban - The IBAN string.
 */
function detectBank(iban) {
  const bankName = document.getElementById("bankName");
  const cleanIban = iban.replace(/\s/g, ''); // Remove spaces for easier processing

  // Check if the IBAN is for Malta (starts with "MT")
  if (cleanIban.startsWith("MT")) {
    const bankCode = cleanIban.substring(4, 8); // Bank code is typically after country code and check digits

    let bank = "Unknown Bank"; // Default value

    // Basic switch for known Maltese bank codes
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
        bank = "Unknown Bank"; // Fallback for unlisted bank codes
    }
    bankName.textContent = `🏦 Bank: ${bank}`;
  } else {
    bankName.textContent = ""; // Clear bank name if not a Maltese IBAN or bank not identified
  }
}

/**
 * Copies the current value of the IBAN input field to the clipboard.
 * Shows a temporary "Copied!" message.
 */
function copyIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  const copyMessage = document.getElementById("copyMessage");

  ibanInput.select(); // Select the text in the input field
  ibanInput.setSelectionRange(0, 99999); // For mobile devices

  document.execCommand("copy"); // Execute copy command

  copyMessage.classList.add('show'); // Show "Copied!" message

  // Hide the message after 2 seconds
  setTimeout(() => {
    copyMessage.classList.remove('show');
  }, 2000);
}

/**
 * Validates an IBAN using the ISO 7064 MOD-97-10 algorithm.
 * @param {string} iban - The IBAN string to validate.
 * @returns {boolean} - True if the IBAN is valid, false otherwise.
 */
function isValidIBAN(iban) {
  // 1. Move the first four characters (country code and check digits) to the end of the string.
  const rearranged = iban.slice(4) + iban.slice(0, 4);

  // 2. Replace each letter in the string with two digits, A=10, B=11, ..., Z=35.
  const converted = rearranged.toUpperCase().replace(/[A-Z]/g, (char) => {
    return char.charCodeAt(0) - 55; // 'A'.charCodeAt(0) is 65, so 65-55=10.
  });

  // 3. Interpret the resulting string as a decimal number and compute the remainder of that number on division by 97.
  // Using BigInt for potentially very large numbers that exceed JavaScript's Number.MAX_SAFE_INTEGER.
  try {
    const remainder = BigInt(converted) % 97n;
    // If the remainder is 1, the IBAN is valid.
    return remainder === 1n;
  } catch (error) {
    // If conversion to BigInt fails (e.g., non-numeric characters after letter conversion), it's invalid.
    console.error("Error during BigInt conversion in isValidIBAN:", error);
    return false;
  }
}

// Event listener for the IBAN input field to format and verify on input
document.getElementById("ibanInput").addEventListener("input", () => {
  formatIBAN();
  verifyIBAN(); // Verify after formatting
});

/**
 * Resets the IBAN input form, clearing all fields and messages.
 */
function resetForm() {
  const ibanInput = document.getElementById("ibanInput");
  const countryName = document.getElementById("countryName");
  const result = document.getElementById("result");
  const bankName = document.getElementById("bankName");
  const copyMessage = document.getElementById("copyMessage");

  ibanInput.value = ""; // Clear input
  ibanInput.style.border = "1px solid #ccc"; // Reset border
  countryName.textContent = ""; // Clear country name
  result.textContent = ""; // Clear result message
  bankName.textContent = ""; // Clear bank name
  copyMessage.classList.remove('show'); // Hide copy message
}

/**
 * Formats the IBAN input value by converting to uppercase and adding spaces every four characters.
 */
function formatIBAN() {
  const ibanInput = document.getElementById("ibanInput");
  let value = ibanInput.value.replace(/\s/g, ''); // Remove existing spaces
  value = value.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 characters
  ibanInput.value = value.toUpperCase(); // Convert to uppercase
}
