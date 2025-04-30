// darkmode.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const isDark = localStorage.getItem("dark-mode") === "true";

  if (isDark) {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
    });
  }
});
