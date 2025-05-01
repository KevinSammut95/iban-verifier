document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Determine initial mode (default to light if nothing is stored)
  const darkModePref = localStorage.getItem("dark-mode");
  const isDark = darkModePref === "true";

  if (isDark) {
    document.body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (toggle) toggle.checked = false;
  }

  // Update mode on toggle
  if (toggle) {
    toggle.addEventListener("change", () => {
      const enableDark = toggle.checked;
      document.body.classList.toggle("dark-mode", enableDark);
      localStorage.setItem("dark-mode", enableDark);
    });
  }
});


