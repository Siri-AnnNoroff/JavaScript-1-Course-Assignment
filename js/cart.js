let cart = [];

const cartBadge = document.querySelector(".cart-badge");

function addToCart(jacket) {
  const alreadyInCart = cart.find((item) => item.id === jacket.id);

  if (alreadyInCart) {
    alreadyInCart.quantity += 1;
  } else {
    cart.push({ ...jacket, quantity: 1 });
  }
  saveCart();
  updateCartBadge();
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
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

//clear cart
const clearCartBtn = document.querySelector(".clear-cart");

clearCartBtn.addEventListener("click", () => {
  cartBadge.textContent = 0;
  localStorage.clear();
  cart = [];
});

//Toast

/**
@param {string} message
 */

function showToast(message) {
  const toastContainer = document.querySelector(".toast-container");
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast", "success");
  toastElement.textContent = message;
  toastContainer.appendChild(toastElement);
  setTimeout(() => {
    toastElement.remove();
  }, 5000);
}
