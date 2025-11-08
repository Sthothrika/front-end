/* --------------------
** app.js (main entry file)
** -------------------- */
import { displayBooks } from './booklisting.js';
import { updateUI } from './uiUpdater.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(); // Load and display the books from data.js
    updateUI();     // Initialize the cart display
});