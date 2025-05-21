/**
 * This script handles the functionality of the IBAN Calculator page.
 * It dynamically generates input fields for BBAN based on the selected country
 * and calculates the corresponding IBAN.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Data store for IBAN formats and BBAN structures for different countries.
  // - length: Total length of the IBAN.
  // - example: An example IBAN for user reference (not directly used in calculation here).
  // - bbanStructure: An array defining the parts of the Basic Bank Account Number (BBAN)
  //   - label: User-friendly label for the input field.
  //   - name: Internal name for the field (used for ID and name attributes).
  //   - length: Expected character length for this part of the BBAN.
  const countryFormats = {
    AL: { length: 28, example: 'AL47212110090000000235698741', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 24 }]},
    AD: { length: 24, example: 'AD1200012030200359100100', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 20 }]},
    AT: { length: 20, example: 'AT611904300234573201', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 16 }]},
    BE: { length: 16, example: 'BE68539007547034', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 12 }]},
    BG: { length: 22, example: 'BG80BNBG96611020345678', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 18 }]},
    HR: { length: 21, example: 'HR1210010051863000160', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 17 }]},
    CY: { length: 28, example: 'CY17002001280000001200527600', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 24 }]},
    CZ: { length: 24, example: 'CZ6508000000192000145399', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 20 }]},
    DK: { length: 18, example: 'DK5000400440116243', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 14 }]},
    EE: { length: 20, example: 'EE382200221020145685', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 16 }]},
    FI: { length: 18, example: 'FI2112345600000785', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 14 }]},
    FR: {
      length: 27,
      example: 'FR1420041010050500013M02606', 
      bbanStructure: [
        { label: 'Bank Code', name: 'bankCode', length: 5 },
        { label: 'Branch Code', name: 'branchCode', length: 5 },
        { label: 'Account Number', name: 'accountNumber', length: 11 },
        { label: 'National Check Digits', name: 'checkDigits', length: 2 }
      ]
    },
    DE: {
      length: 22,
      example: 'DE89370400440532013000', 
      bbanStructure: [
        { label: 'Bank Code (BLZ)', name: 'bankCode', length: 8 },
        { label: 'Account Number', name: 'accountNumber', length: 10 }
      ]
    },
    GR: { length: 27, example: 'GR1601101250000000012300695', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 23 }]},
    HU: { length: 28, example: 'HU42117730161111101800000000', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 24 }]},
    IE: { length: 22, example: 'IE29AIBK93115212345678', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 18 }]},
    IT: {
      length: 27,
      example: 'IT60X0542811101000000123456', 
      bbanStructure: [
        { label: 'Check Character', name: 'checkChar', length: 1 },
        { label: 'Bank Code', name: 'bankCode', length: 5 },
        { label: 'Branch Code', name: 'branchCode', length: 5 },
        { label: 'Account Number', name: 'accountNumber', length: 12 }
      ]
    },
    LV: { length: 21, example: 'LV80BANK0000435195001', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 17 }]},
    LT: { length: 20, example: 'LT121000011101001000', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 16 }]},
    LU: { length: 20, example: 'LU280019400644750000', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 16 }]},
    MT: {
      length: 31,
      example: 'MT84MALT011000012345MTLCAST001S', 
      bbanStructure: [
        { label: 'Bank Code', name: 'bankCode', length: 4 },
        { label: 'Branch Code', name: 'branchCode', length: 5 },
        { label: 'Account Number', name: 'accountNumber', length: 18 }
      ]
    },
    NL: { length: 18, example: 'NL91ABNA0417164300', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 14 }]},
    PL: { length: 28, example: 'PL61109010140000071219812874', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 24 }]},
    PT: { length: 25, example: 'PT50000201231234567890154', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 21 }]},
    RO: { length: 24, example: 'RO49AAAA1B31007593840000', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 20 }]},
    SK: { length: 24, example: 'SK3112000000198742637541', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 20 }]},
    SI: { length: 19, example: 'SI56191000000123438', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 15 }]},
    ES: { length: 24, example: 'ES9121000418450200051332', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 20 }]},
    SE: { length: 24, example: 'SE4550000000058398257466', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 20 }]},
    GB: { length: 22, example: 'GB29NWBK60161331926819', bbanStructure: [{ label: 'BBAN', name: 'bban', length: 18 }]}
  };

  // DOM element references
  const countrySelect = document.getElementById("countrySelect"); 
  const bbanFields = document.getElementById("bbanFields"); // Container for dynamic BBAN inputs
  const calculateBtn = document.getElementById("calculateIbanBtn"); 
  const resultBox = document.getElementById("ibanResult"); // To display calculation result or errors

  // Populate the country select dropdown with options from countryFormats
  for (const code in countryFormats) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = code; // Display country code (e.g., "DE", "FR")
    countrySelect.appendChild(option);
  }

  /**
   * Updates the BBAN input fields based on the selected country.
   * It clears existing fields and generates new ones according to the `bbanStructure`
   * defined in `countryFormats` for the selected country.
   * If a country doesn't have a specific structure, a generic BBAN input is created.
   */
  function updateBBANFields() {
    const selectedCountry = countrySelect.value;
    bbanFields.innerHTML = ""; // Clear previous BBAN input fields
    
    // Hide the initial generic bbanInput and its label from iban-calculator.html if they exist
    const genericBbanInput = document.getElementById('bbanInput');
    const genericBbanLabel = document.querySelector('label[for="bbanInput"]');
    if (genericBbanInput) genericBbanInput.style.display = 'none';
    if (genericBbanLabel) genericBbanLabel.style.display = 'none';

    // Check if the selected country has a defined BBAN structure
    if (countryFormats[selectedCountry] && countryFormats[selectedCountry].bbanStructure) {
      // Generate specific input fields for each part of the BBAN
      countryFormats[selectedCountry].bbanStructure.forEach(field => {
        const label = document.createElement('label');
        label.htmlFor = field.name;
        label.textContent = field.label + ":";
        
        const input = document.createElement("input");
        input.type = "text";
        input.id = field.name; // Used for label association
        input.placeholder = field.label; // User-friendly placeholder
        input.name = field.name;
        input.maxLength = field.length; // Enforce maximum length for the field
        input.dataset.length = field.length; // Store expected length for validation
        input.required = true;
        
        bbanFields.appendChild(label);
        bbanFields.appendChild(input);
        bbanFields.appendChild(document.createElement('br')); // Simple line break for spacing
      });
    } else if (countryFormats[selectedCountry]) {
      // Fallback: If no specific bbanStructure, create a single generic BBAN input field.
      // The length is derived from the total IBAN length minus country code (2) and checksum (2).
      const bbanLength = countryFormats[selectedCountry].length - 4; 

      const label = document.createElement('label');
      label.htmlFor = "bban_generic";
      label.textContent = `BBAN (${bbanLength} characters):`;

      const input = document.createElement("input");
      input.type = "text";
      input.id = "bban_generic";
      input.placeholder = `Enter BBAN (${bbanLength} characters)`;
      input.name = "bban";
      input.maxLength = bbanLength;
      input.dataset.length = bbanLength;
      input.required = true;
      
      bbanFields.appendChild(label);
      bbanFields.appendChild(input);
    }
  }

  /**
   * Calculates the IBAN from the entered BBAN parts for the selected country.
   * It performs validation on input lengths and then applies the ISO 7064 MOD-97-10
   * algorithm to generate the checksum and construct the full IBAN.
   * Displays the generated IBAN or an error message in the resultBox.
   */
  function calculateIBAN() {
    const selectedCountry = countrySelect.value;
    const formatInfo = countryFormats[selectedCountry]; // Get format details for the selected country

    // Ensure a country is selected
    if (!formatInfo) {
      resultBox.textContent = 'Please select a country.';
      resultBox.className = 'status-message status-error'; // Apply error styling
      return;
    }

    const inputs = bbanFields.querySelectorAll("input"); // Get all dynamic BBAN input fields
    let bban = ""; // String to build the full BBAN
    let validationError = false;

    // Special handling for Maltese (MT) account numbers: pad 12-digit numbers to 18 digits
    if (selectedCountry === 'MT') {
      for (let input of inputs) {
        // The account number field for MT is defined with name/id 'accountNumber'
        if (input.id === 'accountNumber') { 
          if (input.value.length === 12) {
            input.value = '000000' + input.value; // Pad with 6 leading zeros
          }
          // Update the dataset.length for the accountNumber field to reflect the new expected length
          // This is important if the original bbanStructure for MT accountNumber has length 12
          // and the validation loop below relies on dataset.length.
          // However, the MT bbanStructure for accountNumber already expects 18 digits.
          // So, if a 12-digit number is entered, this padding makes it 18, aligning with the
          // expectedLength check later. If a user manually enters 18 digits, this block is skipped.
          // If bbanStructure for MT accountNumber was 12, we would do:
          // input.dataset.length = 18; 
          break; // Processed account number field, exit this specific loop
        }
      }
    }

    // Collect and validate BBAN parts from input fields
    for (let input of inputs) {
      const expectedLength = parseInt(input.dataset.length); // Expected length from data attribute
      if (!input.value) { // Check if input is empty
        resultBox.textContent = `Input for ${input.placeholder || input.name} is required.`;
        resultBox.className = 'status-message status-error';
        validationError = true;
        break; // Stop further processing on error
      }
      if (input.value.length !== expectedLength) {
        resultBox.textContent = `Invalid input: ${input.placeholder || input.name} must be ${expectedLength} characters. You entered ${input.value.length}.`;
        resultBox.className = 'status-message status-error';
        validationError = true;
        break; // Stop further processing on error
      }
      bban += input.value.toUpperCase(); // Append valid part to BBAN string (uppercased)
    }

    if (validationError) return; // Exit if any BBAN part validation failed

    // Validate the total length of the constructed BBAN
    const expectedBbanLength = formatInfo.length - 4; // Total IBAN length minus country code (2) and checksum (2)
    if (bban.length !== expectedBbanLength) {
        resultBox.textContent = `Invalid total BBAN length for ${selectedCountry}. Expected ${expectedBbanLength}, got ${bban.length}. Please ensure all parts of the BBAN are entered correctly.`;
        resultBox.className = 'status-message status-error';
        return;
    }
    
    const countryCode = selectedCountry;
    const checkDigitsPlaceholder = "00"; // Placeholder for checksum calculation
    
    // 1. Construct the temporary string for checksum calculation: BBAN + Country Code + "00"
    const stringToConvert = bban + countryCode + checkDigitsPlaceholder;
    
    // 2. Replace letters with numbers (A=10, B=11, ..., Z=35)
    const numericString = stringToConvert
      .split('')
      .map(char => {
        if (char >= '0' && char <= '9') {
          return char;
        } else if (char >= 'A' && char <= 'Z') {
          return (char.charCodeAt(0) - 55).toString(); // 'A' is 65, 65-55 = 10
        }
        // This should not be reached if BBAN parts are validated for alphanumeric, 
        // but as a safeguard, return empty or handle error.
        return ''; 
      })
      .join('');

    // 3. Calculate checksum: 98 - (numericString MOD 97)
    let checksum;
    try {
      // Ensure numericString is not empty if bban was not empty (could happen if bban contains invalid chars not caught above)
      if (numericString.length === 0 && bban.length > 0) {
          resultBox.textContent = "BBAN contains invalid characters. Please use alphanumeric characters only.";
          resultBox.className = 'status-message status-error';
          return;
      }
      checksum = (98n - (BigInt(numericString) % 97n)).toString().padStart(2, "0"); // Ensure checksum is 2 digits
    } catch (e) {
        // Catch errors during BigInt conversion or modulo operation (e.g., if numericString is still not a valid number)
        resultBox.textContent = "Error during checksum calculation. Please check BBAN format and ensure it contains valid characters.";
        resultBox.className = 'status-message status-error';
        console.error("Checksum calculation error:", e);
        return;
    }

    // 4. Construct the final IBAN: Country Code + Calculated Checksum + BBAN
    const iban = countryCode + checksum + bban;
    const formattedIBAN = iban.replace(/(.{4})/g, '$1 ').trim(); // Format for display with spaces

    // Display the generated IBAN
    resultBox.innerHTML = `Generated IBAN: <strong>${formattedIBAN}</strong>`;
    resultBox.className = 'status-message status-success'; // Apply success styling
  }

  // Event Listeners
  if (countrySelect) {
    countrySelect.addEventListener("change", updateBBANFields); // Update fields when country changes
    updateBBANFields(); // Initial call to set up BBAN fields for the default selected country
  }
  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateIBAN); // Calculate IBAN on button click
  }
});
