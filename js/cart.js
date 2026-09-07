let cart = [];

const cartBadge = document.querySelector(".cart-badge");

function addToCart(jacket) {
  cart.push(jacket);
  saveCart();
  updateCartBadge();
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
  updateCartBadge();
}

loadCart();

// cart counter

function updateCartBadge() {
  cartBadge.textContent = cart.length;
}
