document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("country");
  const bbanFields = document.getElementById("bbanFields");
  const calculateBtn = document.getElementById("calculateIbanBtn");
  const resultBox = document.getElementById("ibanResult");

  const countryFormats = {
    DE: {
      length: 22,
      example: '370400440532013000',
      bbanStructure: [
        { label: 'Bank Code (BLZ)', name: 'bankCode', length: 8 },
        { label: 'Account Number', name: 'accountNumber', length: 10 }
      ]
    },
    FR: {
      length: 27,
      example: '20041010050500013M02606',
      bbanStructure: [
        { label: 'Bank Code', name: 'bankCode', length: 5 },
        { label: 'Branch Code', name: 'branchCode', length: 5 },
        { label: 'Account Number', name: 'accountNumber', length: 11 },
        { label: 'National Check Digits', name: 'checkDigits', length: 2 }
      ]
    },
    IT: {
      length: 27,
      example: 'X0542811101000000123456',
      bbanStructure: [
        { label: 'Check Character', name: 'checkChar', length: 1 },
        { label: 'Bank Code', name: 'bankCode', length: 5 },
        { label: 'Branch Code', name: 'branchCode', length: 5 },
        { label: 'Account Number', name: 'accountNumber', length: 12 }
      ]
    },
    MT: {
      length: 31,
      example: 'MALT011000012345MTLCAST001S',
      bbanStructure: [
        { label: 'Bank Code', name: 'bankCode', length: 4 },
        { label: 'Branch Code', name: 'branchCode', length: 5 },
        { label: 'Account Number', name: 'accountNumber', length: 18 }
      ]
    }
    // Add more as needed
  };

  function updateBBANFields() {
    const selectedCountry = countrySelect.value;
    bbanFields.innerHTML = "";

    if (countryFormats[selectedCountry]) {
      countryFormats[selectedCountry].bbanStructure.forEach(field => {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = field.label;
        input.name = field.name;
        input.maxLength = field.length;
        input.dataset.length = field.length;
        input.required = true;
        bbanFields.appendChild(input);
      });
    }
  }

  function calculateIBAN() {
    const selectedCountry = countrySelect.value;
    const format = countryFormats[selectedCountry];

    if (!format) return;

    const inputs = bbanFields.querySelectorAll("input");
    let bban = "";
    for (let input of inputs) {
      if (input.value.length !== parseInt(input.dataset.length)) {
        resultBox.innerHTML = `<span class="status-error">Invalid input: ${input.placeholder} must be ${input.dataset.length} characters</span>`;
        return;
      }
      bban += input.value.toUpperCase();
    }

    const countryCode = selectedCountry;
    const checkDigits = "00";
    const rearranged = bban + countryCode + checkDigits;
    const numeric = rearranged.replace(/[A-Z]/g, ch => ch.charCodeAt(0) - 55);
    const mod97 = BigInt(numeric) % 97n;
    const checksum = String(98n - mod97).padStart(2, "0");

    const iban = countryCode + checksum + bban;
    resultBox.innerHTML = `<span class="status-success">Generated IBAN: <strong>${iban}</strong></span>`;
  }

  // Event Listeners
  countrySelect.addEventListener("change", updateBBANFields);
  calculateBtn.addEventListener("click", calculateIBAN);

  updateBBANFields(); // Initial setup
});

