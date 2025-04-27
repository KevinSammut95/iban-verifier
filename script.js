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
