/**
 * Dark Mode Toggle - Single Source of Truth
 * Uses localStorage key: 'darkMode' (values: 'enabled' | 'disabled')
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Check saved preference (default to light mode)
  const isDarkEnabled = localStorage.getItem("darkMode") === "enabled";

  if (isDarkEnabled) {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (toggle) toggle.checked = false;
  }

  // Handle toggle changes
  if (toggle) {
    toggle.addEventListener("change", () => {
      const enableDark = toggle.checked;
      document.body.classList.toggle("dark-mode", enableDark);
      localStorage.setItem("darkMode", enableDark ? "enabled" : "disabled");
    });
  }
});
