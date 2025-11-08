/* --------------------
** uiUpdater.js
** -------------------- */
import { getCart, handleRemoveFromCart, calculateTotal } from './cartManager.js';

/**
 * Updates the UI to display the current cart contents and total price.
 */
export const updateUI = () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const cart = getCart();

    // Clear previous cart items
    cartItemsList.innerHTML = '';

    // Display each item in the cart
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span>${item.title} - $${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-book-id="${item.id}">Remove</button>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // Display the total price
    const total = calculateTotal();
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners for "Remove" buttons
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const bookId = parseInt(event.target.dataset.bookId);
            handleRemoveFromCart(bookId);
        }
    });
};