let cart = [];

function addToCart(jacket) {
  cart.push(jacket);
  saveCart();
  console.log(`${jacket.title} added to cart!`);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

loadCart();
