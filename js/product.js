const url = "https://v2.api.noroff.dev/rainy-days";
const productDetails = document.querySelector(".product-details");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const currencySymbol = "$";

//fetching single product

async function fetchSingleJacket() {
  productDetails.textContent = "Loading our jackets...";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();
    const singleProduct = result.data.find((jacket) => jacket.id === productId);
    productDetails.textContent = "";
    if (!singleProduct) {
      throw new Error(`No product found`);
    }
    displaySingleJacket(singleProduct);
  } catch (error) {
    productDetails.textContent = "Product not found.";
    console.error("Failed to fetch product" + error);
  }
}

//showing single product

function displaySingleJacket(jacket) {
  const name = document.createElement("h1");
  name.textContent = jacket.title;
  productDetails.appendChild(name);

  const image = document.createElement("img");
  image.src = jacket.image.url;
  image.alt = jacket.image.alt;
  productDetails.appendChild(image);

  const description = document.createElement("p");
  description.textContent = jacket.description;
  productDetails.appendChild(description);

  const originalPrice = document.createElement("p");
  if (jacket.onSale === true) {
    originalPrice.classList.add("fullPrice");
    originalPrice.textContent = currencySymbol + jacket.price;
    productDetails.appendChild(originalPrice);

    const salePrice = document.createElement("p");
    salePrice.textContent = currencySymbol + jacket.discountedPrice;
    productDetails.appendChild(salePrice);
    salePrice.classList.add("onSale");
  } else {
    originalPrice.textContent = currencySymbol + jacket.price;
    productDetails.appendChild(originalPrice);
  }

  jacket.sizes.forEach((size) => {
    const sizeBtn = document.createElement("button");
    sizeBtn.classList.add("size-button");
    sizeBtn.textContent = size;
    productDetails.appendChild(sizeBtn);
  });

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.classList.add("add-product");
  productDetails.appendChild(addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(jacket);
    showToast("You have added: " + jacket.title + " to your cart!", "success");
  });
}
fetchSingleJacket();
