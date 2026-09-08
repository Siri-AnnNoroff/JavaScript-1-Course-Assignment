const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
console.log(productId);

let allJackets = [];
const currencySymbol = "$";

async function fetchSingleJacket() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();

    result.find(productId);
  } catch (error) {
    console.error("Failed to fetch products" + error);
  }
}

fetchSingleJacket();
