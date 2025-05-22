document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("countrySelect");
  const bbanFieldsContainer = document.getElementById("bbanFieldsContainer");
  const calculateIbanBtn = document.getElementById("calculateIbanBtn");
  const clearCalculatorBtn = document.getElementById("clearCalculatorBtn");
  const ibanResult = document.getElementById("ibanResult");

  // Populate country select options from ibanFormats (global, from data.js)
  for (const code in ibanFormats) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = code; // Display country code
    // To display country name: option.textContent = countries[code] ? `${code} - ${countries[code].name}` : code;
    countrySelect.appendChild(option);
  }

  function updateBBANFields() {
    bbanFieldsContainer.innerHTML = ""; // Clear previous fields
    const selectedCountry = countrySelect.value;
    const format = ibanFormats[selectedCountry];

    if (format && format.bbanStructure) {
      format.bbanStructure.forEach(field => {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = field.label;
        input.name = field.name;
        input.id = field.name; // Added id for potential future use
        input.maxLength = field.length;
        input.dataset.length = field.length;
        input.required = true;
        input.setAttribute("aria-label", field.label); // Add aria-label
        bbanFieldsContainer.appendChild(input);
      });
    } else {
      // Fallback to a single input field if no bbanStructure is defined
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter full BBAN";
      input.name = "bban";
      input.id = "bban";
      input.setAttribute("aria-label", "Basic Bank Account Number"); // Add aria-label for fallback
      if (format) {
        // Estimate BBAN length: IBAN length - country code (2) - checksum (2)
        const estimatedBbanLength = format.length - 4;
        input.maxLength = estimatedBbanLength;
        input.dataset.length = estimatedBbanLength;
      }
      input.required = true;
      bbanFieldsContainer.appendChild(input);
    }
    ibanResult.textContent = ""; // Clear previous results
  }

  function calculateIBAN() {
    const selectedCountry = countrySelect.value;
    const format = ibanFormats[selectedCountry];
    let bban = "";

    if (!format) {
      ibanResult.textContent = "Please select a country.";
      return;
    }

    const inputs = bbanFieldsContainer.querySelectorAll("input");
    for (let input of inputs) {
      if (!input.value.trim()) {
        ibanResult.textContent = `Error: ${input.placeholder} is required.`;
        return;
      }
      if (input.value.length !== parseInt(input.dataset.length)) {
        ibanResult.textContent = `Error: ${input.placeholder} must be ${input.dataset.length} characters. You entered ${input.value.length}.`;
        return;
      }
      bban += input.value.toUpperCase().trim();
    }

    if (!bban) {
      ibanResult.textContent = 'Please enter BBAN details.';
      return;
    }

    const countryCode = selectedCountry;
    // Placeholder '00' for check digits calculation
    const rearranged = bban + countryCode + "00";

    const converted = rearranged
      .toUpperCase()
      .split('')
      .map(char => (/[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : char))
      .join('');

    let checksum;
    try {
      checksum = 98n - (BigInt(converted) % 97n);
    } catch (e) {
      ibanResult.textContent = 'Error calculating checksum. BBAN might contain invalid characters or be too long.';
      return;
    }
    
    const formattedChecksum = checksum.toString().padStart(2, '0');
    const finalIban = countryCode + formattedChecksum + bban;
    const formattedIBANWithSpaces = finalIban.replace(/(.{4})/g, '$1 ').trim();

    ibanResult.innerHTML = `<span class="status-success">Generated IBAN: <strong>${formattedIBANWithSpaces}</strong></span>`;
  }

  function clearCalculator() {
    countrySelect.selectedIndex = 0; // Reset to the first option
    updateBBANFields(); // Update fields for the (newly) selected country
    ibanResult.textContent = ""; // Clear any previous result message
    // Clear input values
    const inputs = bbanFieldsContainer.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
  }

  // Event Listeners
  countrySelect.addEventListener("change", updateBBANFields);
  calculateIbanBtn.addEventListener("click", calculateIBAN);
  clearCalculatorBtn.addEventListener("click", clearCalculator);

  // Initial setup
  updateBBANFields(); 
});
