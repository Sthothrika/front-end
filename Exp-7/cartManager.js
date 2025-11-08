/* --------------------
** cartManager.js
** -------------------- */
import { updateUI } from './uiUpdater.js';

let shoppingCart = [];

/**
 * Adds a book to the shopping cart.
 * @param {object} book - The book object to add.
 */
export const handleAddToCart = (book) => {
    shoppingCart.push(book);
    console.log(`Added "${book.title}" to cart.`);
};

/**
 * Removes a book from the shopping cart by its ID.
 * @param {number} bookId - The ID of the book to remove.
 */
export const handleRemoveFromCart = (bookId) => {
    const initialLength = shoppingCart.length;
    shoppingCart = shoppingCart.filter(item => item.id !== bookId);
    if (shoppingCart.length < initialLength) {
        console.log(`Removed book with ID ${bookId} from cart.`);
    }
    updateUI();
};

/**
 * Calculates the total price of all items in the shopping cart.
 * @returns {number} The total price.
 */
export const calculateTotal = () => {
    return shoppingCart.reduce((total, book) => total + book.price, 0);
};

/**
 * Gets the current shopping cart array.
 * @returns {Array} The shopping cart array.
 */
export const getCart = () => {
    return shoppingCart;
};