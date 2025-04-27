const countryCodes = {
  'MT': 'Malta',
  'GB': 'United Kingdom',
  'DE': 'Germany',
  'FR': 'France',
  'IT': 'Italy',
  'ES': 'Spain',
  'NL': 'Netherlands',
  'BE': 'Belgium',
  'PT': 'Portugal',
  'IE': 'Ireland',
  'CH': 'Switzerland',
  // You can add more countries if you want later
};
function verifyIBAN() {
  const iban = document.getElementById("ibanInput").value.replace(/\s+/g, '').toUpperCase();
  const result = document.getElementById("result");

  if (!/^[A-Z0-9]+$/.test(iban)) {
    result.textContent = "Invalid characters in IBAN.";
    result.style.color = "red";
    return;
  }

  // Move the first 4 characters to the end
  const rearranged = iban.slice(4) + iban.slice(0, 4);

  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  const converted = rearranged.split('').map(ch =>
    isNaN(ch) ? ch.charCodeAt(0) - 55 : ch
  ).join('');

  // Perform mod-97 check
  const remainder = BigInt(converted) % 97n;

  if (remainder === 1n) {
    result.textContent = "✅ Valid IBAN!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Invalid IBAN.";
    result.style.color = "red";
  }
}
function formatIBAN(input) {
  // Remove all non-alphanumeric characters (like spaces)
  let value = input.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
  input.value = value.toUpperCase(); // Always show in uppercase
}

// Attach formatting as the user types
document.getElementById("ibanInput").addEventListener('input', function() {
  formatIBAN(this);

  const iban = this.value.replace(/\s+/g, '').toUpperCase();
  const countryCode = iban.slice(0, 2); // Get first two letters
  const countryName = countryCodes[countryCode] || '';

  const countryNameElement = document.getElementById("countryName");
  if (countryName) {
    countryNameElement.textContent = `🌍 Country: ${countryName}`;
  } else {
    countryNameElement.textContent = '';
  }
});
