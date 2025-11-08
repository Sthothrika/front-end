/* --------------------
** bookListing.js
** -------------------- */
import books from './data.js';
import { handleAddToCart } from './cartManager.js';
import { updateUI } from './uiUpdater.js';

/**
 * Renders the list of books on the page.
 */
export const displayBooks = () => {
    const booksContainer = document.getElementById('books-container');
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <div class="book-details">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <p>Price: $${book.price.toFixed(2)}</p>
                <p class="availability ${book.availability === 'out of stock' ? 'out-of-stock' : ''}">
                    ${book.availability === 'out of stock' ? 'Out of Stock' : 'In Stock'}
                </p>
            </div>
            <button class="add-to-cart" data-book-id="${book.id}" ${book.availability === 'out of stock' ? 'disabled' : ''}>
                Add to Cart
            </button>
        `;
        booksContainer.appendChild(bookElement);
    });

    // Add event listeners for "Add to Cart" buttons
    booksContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const bookId = parseInt(event.target.dataset.bookId);
            const bookToAdd = books.find(book => book.id === bookId);
            if (bookToAdd) {
                handleAddToCart(bookToAdd);
                updateUI();
            }
        }
    });
};