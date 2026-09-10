const url = "https://v2.api.noroff.dev/rainy-days";
const productDetails = document.querySelector(".product-details");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
console.log(productId);

const currencySymbol = "$";

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
    productDetails.textContent = "Failed to fetch product...";
    console.error("Failed to fetch product" + error);
  }
}

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

  const price = document.createElement("p");
  price.textContent = currencySymbol + jacket.price;
  productDetails.appendChild(price);

  jacket.sizes.forEach((size) => {
    const sizeBtn = document.createElement("button");
    sizeBtn.classList.add("size-button");
    sizeBtn.textContent = size;
    productDetails.appendChild(sizeBtn);
  });
  /*
  const basecolor = document.createElement("p");
  basecolor.textContent = jacket.baseColor;
  productDetails.appendChild(basecolor);

  jacket.tags.forEach((tag) => {
    const jacketTags = document.createElement("p");
    jacketTags.textContent = tag;
    productDetails.appendChild(jacketTags);
  });
  */

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.classList.add("add-product");
  productDetails.appendChild(addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(jacket);
    showToast("You have added: " + jacket.title + " to you cart!");
  });
}
fetchSingleJacket();
