"use strict";

const url = "https://v2.api.noroff.dev/rainy-days";
const currencySymbol = "$";

const checkoutSection = document.querySelector(".checkout-section");
console.log(cart);

function displayCheckout() {
  cart.forEach((product) => {
    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;
    checkoutSection.appendChild(image);

    const title = document.createElement("h3");
    title.textContent = product.title;
    checkoutSection.appendChild(title);

    const price = document.createElement("p");
    price.textContent = currencySymbol + product.price;
    checkoutSection.appendChild(price);
  });
}
displayCheckout();

let totalCost = 0;

function calculateCost() {
  cart.forEach((product) => {
    totalCost += product.price * product.quantity;
  });
  return totalCost;
}
const total = calculateCost();

const totalSection = document.querySelector(".total-section");

function displayCost() {
  cart.forEach((product) => {
    const priceList = document.createElement("p");
    priceList.textContent = currencySymbol + product.price;
    totalSection.appendChild(priceList);
  });
  const totalCost = document.createElement("p");
  totalCost.textContent = currencySymbol + calculateCost();
  totalSection.appendChild(totalCost);

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

displayCost();
