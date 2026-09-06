"use strict";

const url = "https://v2.api.noroff.dev/rainy-days";
const itemsAtIndex = 3;
let allJackets = [];
const currencySymbol = "$";

async function fetchJackets() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();
    allJackets = result.data;
    renderFilteredJackets("all");
  } catch (error) {
    console.error("Failed to fetch products" + error);
  }
}

fetchJackets();

function displayJackets(product) {
  const productsSection = document.getElementById("products-area");

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productsSection.appendChild(productCard);

  const image = document.createElement("img");
  image.src = product.image.url;
  image.alt = product.image.alt;
  productCard.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = product.title;
  productCard.appendChild(name);

  const price = document.createElement("p");
  price.textContent = currencySymbol + product.price;
  productCard.appendChild(price);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  productCard.appendChild(addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
  });
}

// sorting jackets by gender

const sortBox = document.getElementById("sortBox");
sortBox.addEventListener("change", () => {
  renderFilteredJackets(sortBox.value);
});

function renderFilteredJackets(gender) {
  const productsSection = document.getElementById("products-area");
  productsSection.innerHTML = "";

  let filtered = [];

  if (gender === "all") {
    filtered = allJackets;
  } else {
    filtered = allJackets.filter(
      (jacket) => jacket.gender.toLowerCase() === gender.toLowerCase(),
    );
  }

  filtered.forEach((jacket) => displayJackets(jacket));
}
