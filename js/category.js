"use strict";

const url = "https://v2.api.noroff.dev/rainy-days";
const currencySymbol = "$";

//decides which gender to show

function getCategoryFromPage() {
  if (window.location.pathname.includes("womens")) {
    return "Female";
  } else if (window.location.pathname.includes("mens")) {
    return "Male";
  }
  return null;
}

//fetch chosen gender

async function fetchCategoryJackets() {
  const productsSection = document.querySelector(".products-section");
  productsSection.innerHTML = "";

  const loadingWrapper = document.createElement("div");
  loadingWrapper.classList.add("loading-wrapper");

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  const icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-compass");
  spinner.appendChild(icon);
  loadingWrapper.appendChild(spinner);

  const loadingText = document.createElement("p");
  loadingText.textContent = "Loading our jackets...";
  loadingWrapper.appendChild(loadingText);

  productsSection.appendChild(loadingWrapper);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();
    const category = getCategoryFromPage();
    productsSection.innerHTML = "";
    const filtered = result.data.filter((jacket) => jacket.gender === category);

    filtered.forEach((jacket) => displayJackets(jacket));
  } catch (error) {
    productsSection.textContent = "Failed to fetch products";
    console.error("Failed to fetch products: " + error);
  }
}

//show chosen gender

function displayJackets(product) {
  const productsSection = document.querySelector(".products-section");

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productsSection.appendChild(productCard);

  const link = document.createElement("a");
  link.href = `../product/index.html?id=${product.id}`;
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
    showToast("You have added: " + product.title + " to your cart!", "success");
  });
}

fetchCategoryJackets();
