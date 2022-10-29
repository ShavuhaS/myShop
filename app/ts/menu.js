import { Server } from '../js/pages/main/classes.js';
import { previewProductBlock } from '../js/modules/productModule.js';
const server = new Server();
const toggleButtons = document.querySelectorAll('.header__action-menu');
toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const menu = document.querySelector('.header__menu-wrapper');
        menu && menu.classList.toggle('hidden');
    });
});
const cartButtons = document.querySelectorAll('.header__action-cart');
cartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const cartWrapper = document.querySelector('.header__cart-wrapper');
        const cart = localStorage.getItem('cart');
        if (cartWrapper) {
            if (!cart) {
                cartWrapper.classList.add('empty');
                cartWrapper.textContent = 'Корзина пустая';
            }
            else {
                cartWrapper.classList.remove('empty');
                const itemWrapper = cartWrapper.querySelector('.header__cart');
                if (itemWrapper)
                    itemWrapper.textContent = '';
                const cartTotalPrice = document.querySelector('.header__cart-price');
                const cartProductNumber = document.querySelector('.header__cart-amount');
                let totalPrice = 0;
                JSON.parse(cart).forEach((product) => {
                    totalPrice += product.price;
                    itemWrapper === null || itemWrapper === void 0 ? void 0 : itemWrapper.append(previewProductBlock(product));
                });
                if (cartTotalPrice)
                    cartTotalPrice.textContent = `${totalPrice} $`;
                if (cartProductNumber)
                    cartProductNumber.textContent = JSON.parse(cart).length;
            }
            cartWrapper.classList.toggle('hidden');
        }
    });
});
const searchInput = document.querySelector(".header__search");
if (searchInput) {
    searchInput.addEventListener('change', (event) => {
        const searchDropdown = document.querySelector('.header__search-dropdown');
        const eventTarget = event.target;
        if (searchDropdown) {
            searchDropdown.innerHTML = "";
            if (eventTarget.value !== "") {
                searchDropdown.classList.remove('hidden');
                searchInput.classList.add('active');
                server.request(`products?q=${eventTarget.value}`).then((response) => {
                    console.log(response);
                    response.forEach((item) => {
                        searchDropdown.append(previewProductBlock(item));
                    });
                });
            }
            else {
                searchDropdown.classList.add('hidden');
                searchInput.classList.remove('active');
            }
        }
    });
}
const updateCart = () => {
    const cartObject = localStorage.getItem('cart');
    if (cartObject) {
        const cartWrappers = document.querySelectorAll('.header__action-cart-wrapper');
        cartWrappers.forEach(cartWrapper => {
            const cartItemCount = cartWrapper.querySelector('.header__action-cart-itemCount');
            const cart = cartWrapper.querySelector('.header__action-cart');
            let itemNumber = JSON.parse(cartObject).length;
            if (itemNumber === 0)
                cartItemCount.classList.add('hidden');
            else {
                cartItemCount.classList.remove('hidden');
                cartItemCount.textContent = itemNumber;
            }
        });
    }
};
window.addEventListener('load', updateCart);
