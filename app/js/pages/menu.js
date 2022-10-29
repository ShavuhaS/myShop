import { Server } from './main/classes.js';
import { previewProductBlock } from '../modules/productModule.js';

const server = new Server();

const toggleButtons = document.querySelectorAll('.header__action-menu');

toggleButtons.forEach((button) => {
   button.addEventListener('click', () => {
      const menu = document.querySelector('.header__menu-wrapper');
      menu.classList.toggle('hidden');
   })
})

const searchItem = (item) => {
   const searchItemWrapper = document.createElement('a');
   searchItemWrapper.classList.add("header__search-item");
   searchItemWrapper.href = `/product.html?id=${item.id}`;
   const searchItemImage = document.createElement("img");
   searchItemImage.src = item.data.images[0];
   searchItemImage.classList.add("header__search-item-image");
   const searchItemDetails = document.createElement("div");
   searchItemDetails.classList.add("header__search-details");
   const searchItemTitle = document.createElement("h3");
   searchItemTitle.textContent = item.name;
   const searchItemPrice = document.createElement("p");
   searchItemPrice.textContent = `${item.price} $`;
   searchItemDetails.append(searchItemTitle, searchItemPrice);
   searchItemWrapper.append(searchItemImage, searchItemDetails);

   return searchItemWrapper
}

const searchInput = document.querySelector(".header__search");

searchInput.addEventListener('change', (event) => {
   const searchDropdown = document.querySelector('.header__search-dropdown');
   searchDropdown.innerHTML = "";
   if (event.target.value !== "") {
      searchDropdown.classList.remove('hidden');
      searchInput.classList.add('active');
      server.request(`products?q=${event.target.value}`).then((response) => {
         console.log(response);
         response.forEach((item) => {
            searchDropdown.append(previewProductBlock(item));
         })
      })
   } else {
      searchDropdown.classList.add('hidden');
      searchInput.classList.remove('active');

   }
})

const cartButtons = document.querySelectorAll('.header__action-cart');
cartButtons.forEach( (button) => {
   button.addEventListener('click', (event) => {
      const cartWrapper = document.querySelector('.header__cart-wrapper');
      const cart = localStorage.getItem('cart');
      if(!cart) {
         cartWrapper.classList.add('empty');
         cartWrapper.textContent = 'Корзина пустая'
      } else {
         cartWrapper.classList.remove('empty');
         const itemWrapper = cartWrapper.querySelector('.header__cart');
         itemWrapper.textContent = '';
         const cartTotalPrice = document.querySelector('.header__cart-price');
         const cartProductNumber = document.querySelector('.header__cart-amount');
         let totalPrice = 0;

         JSON.parse(cart).forEach((product) => {
            console.log(product);
            totalPrice += product.price;
            itemWrapper.append(previewProductBlock(product));
         })

         cartTotalPrice.textContent = `${totalPrice} $`;

         cartProductNumber.textContent = JSON.parse(cart).length;
      }
      cartWrapper.classList.toggle('hidden');
   })
});

const updateCart = () => {
   const cartObject = localStorage.getItem('cart');
   if(cartObject) {
      const cartWrappers = document.querySelectorAll('.header__action-cart-wrapper');
      cartWrappers.forEach(cartWrapper => {
         const cartItemCount = cartWrapper.querySelector('.header__action-cart-itemCount');
         const cart = cartWrapper.querySelector('.header__action-cart');
   
         let itemNumber = JSON.parse(cartObject).length;
         if (itemNumber === 0) cartItemCount.classList.add('hidden');
         else {
            cartItemCount.classList.remove('hidden');
            cartItemCount.textContent = itemNumber;
         }
      });
   }
}

window.onload = updateCart();