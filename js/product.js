const url = "https://v2.api.noroff.dev/rainy-days";
const productDetails = document.querySelector(".product-details");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
console.log(productId);

const currencySymbol = "$";

async function fetchSingleJacket() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();

    const singleProduct = result.data.find((jacket) => jacket.id === productId);
    displaySingleJacket(singleProduct);
  } catch (error) {
    console.error("Failed to fetch products" + error);
  }
}

function displaySingleJacket(jacket) {
  const image = document.createElement("img");
  image.src = jacket.image.url;
  image.alt = jacket.image.alt;
  productDetails.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = jacket.title;
  productDetails.appendChild(name);

  const price = document.createElement("p");
  price.textContent = currencySymbol + jacket.price;
  productDetails.appendChild(price);

  const description = document.createElement("p");
  description.textContent = jacket.description;
  productDetails.appendChild(description);

  jacket.sizes.forEach((size) => {
    const sizeBtn = document.createElement("button");
    sizeBtn.textContent = size;
    productDetails.appendChild(sizeBtn);
  });

  const basecolor = document.createElement("p");
  basecolor.textContent = jacket.baseColor;
  productDetails.appendChild(basecolor);

  const tags = document.createElement("p");
  tags.textContent = jacket.tags;
  productDetails.appendChild(tags);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.classList.add("add-product");
  productDetails.appendChild(addToCartBtn);

  addToCartBtn.addEventListener("click", () => {
    addToCart(jacket);
  });
}
fetchSingleJacket();
