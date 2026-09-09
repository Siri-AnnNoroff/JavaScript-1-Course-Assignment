"use strict";

const url = "https://v2.api.noroff.dev/rainy-days";
const currencySymbol = "$";

function getCategoryFromPage() {
  if (window.location.pathname.includes("womens")) {
    return "Female";
  } else if (window.location.pathname.includes("mens")) {
    return "Male";
  }
  return null;
}

async function fetchCategoryJackets() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();
    const category = getCategoryFromPage();

    const filtered = result.data.filter((jacket) => jacket.gender === category);

    filtered.forEach((jacket) => displayJackets(jacket));
  } catch (error) {
    console.error("Failed to fetch products: " + error);
  }
}

function displayJackets(product) {
  const productsSection = document.querySelector(".products-section");

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productsSection.appendChild(productCard);

  const link = document.createElement("a");

  link.href = `/product/index.html?id=${product.id}`;
  productCard.appendChild(link);

  const image = document.createElement("img");
  image.src = product.image.url;
  image.alt = product.image.alt;
  link.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = product.title;
  link.appendChild(name);

  const price = document.createElement("p");
  price.textContent = currencySymbol + product.price;
  productCard.appendChild(price);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.classList.add("add-product");
  productCard.appendChild(addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
  });
}

fetchCategoryJackets();
