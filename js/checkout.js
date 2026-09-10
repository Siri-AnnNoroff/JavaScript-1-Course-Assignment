"use strict";

const url = "https://v2.api.noroff.dev/rainy-days";
const currencySymbol = "$";

const checkoutSection = document.querySelector(".checkout-section");
const checkoutPage = document.querySelector(".checkout-page");

function emptyCart() {
  return cart.length === 0;
}

function displayCheckout() {
  if (emptyCart()) {
    checkoutSection.textContent = "Your cart is empty.";
    return;
  }
  cart.forEach((product) => {
    const card = document.createElement("div");
    checkoutSection.appendChild(card);

    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;
    card.appendChild(image);

    const title = document.createElement("h3");
    title.textContent = product.title;
    card.appendChild(title);

    const price = document.createElement("p");
    price.textContent = currencySymbol + product.price;
    card.appendChild(price);

    const removeBtm = document.createElement("button");
    removeBtm.textContent = "Remove from cart";
    removeBtm.classList.add("remove-product");
    card.appendChild(removeBtm);

    removeBtm.addEventListener("click", () => {
      removeFromCart(product);
      showToast("You have removed: " + product.title + " from your cart!");
    });
  });
}
displayCheckout();

const totalSection = document.querySelector(".total-section");

function calculateCost() {
  let totalCost = 0;
  cart.forEach((product) => {
    totalCost += product.price * product.quantity;
  });
  return totalCost;
}
const total = calculateCost();

function displayCost() {
  if (emptyCart()) {
    totalSection.textContent = "";
    return;
  }
  cart.forEach((product) => {
    const priceList = document.createElement("p");
    priceList.textContent = currencySymbol + product.price;
    totalSection.appendChild(priceList);
  });
  const totalSum = document.createElement("p");
  totalSum.textContent = currencySymbol + calculateCost();
  totalSection.appendChild(totalSum);

  const placeOrderLink = document.createElement("a");
  placeOrderLink.href = `/checkout/confirmation/index.html`;
  totalSection.appendChild(placeOrderLink);

  const placeOrderBtn = document.createElement("button");
  placeOrderBtn.textContent = "Place order";

  placeOrderLink.appendChild(placeOrderBtn);

  placeOrderBtn.addEventListener("click", () => {
    cartBadge.textContent = 0;
    localStorage.clear();
    cart = [];
  });
}
calculateCost();
displayCost();
