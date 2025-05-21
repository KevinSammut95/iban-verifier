/**
 * Handles the dark mode functionality for the website.
 * It checks for a user's preference in localStorage and applies dark mode
 * if previously enabled. It also listens for changes on the dark mode toggle
 * to switch between light and dark themes and save the preference.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Get the dark mode toggle switch element
  const toggle = document.getElementById("darkModeToggle");

  // Determine initial mode by checking localStorage
  // Defaults to light mode if no preference is stored or if the stored value is not "true"
  const darkModePref = localStorage.getItem("dark-mode");
  const isDark = darkModePref === "true"; // Strict check for "true"

  // Apply the initial mode
  if (isDark) {
    document.body.classList.add("dark-mode"); // Add 'dark-mode' class to the body
    if (toggle) toggle.checked = true; // Set the toggle switch to the "on" state
  } else {
    document.body.classList.remove("dark-mode"); // Ensure 'dark-mode' class is not on the body
    if (toggle) toggle.checked = false; // Set the toggle switch to the "off" state
  }

  // Add event listener to the toggle switch if it exists
  if (toggle) {
    toggle.addEventListener("change", () => {
      const enableDark = toggle.checked; // Check if the toggle is now checked (true for dark mode)
      
      // Toggle the 'dark-mode' class on the body based on the switch state
      // The second argument of classList.toggle() adds the class if true, removes if false.
      document.body.classList.toggle("dark-mode", enableDark);
      
      // Save the user's preference to localStorage
      localStorage.setItem("dark-mode", enableDark); // Stores "true" or "false"
    });
  }
});
