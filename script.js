const products = [
  {
    id: 1,
    name: "T-shirt Premium",
    category: "vêtements",
    price: 29.99,
    image: "👕"
  },
  {
    id: 2,
    name: "Chaussures Sport",
    category: "vêtements",
    price: 79.99,
    image: "👟"
  },
  {
    id: 3,
    name: "Sac à dos",
    category: "accessoires",
    price: 45.50,
    image: "🎒"
  },
  {
    id: 4,
    name: "Montre élégante",
    category: "accessoires",
    price: 59.99,
    image: "⌚"
  },
  {
    id: 5,
    name: "Casque audio",
    category: "électronique",
    price: 89.99,
    image: "🎧"
  },
  {
    id: 6,
    name: "Smartphone",
    category: "électronique",
    price: 499.99,
    image: "📱"
  },
  {
    id: 7,
    name: "Lunettes de soleil",
    category: "accessoires",
    price: 24.99,
    image: "🕶️"
  },
  {
    id: 8,
    name: "Veste moderne",
    category: "vêtements",
    price: 99.99,
    image: "🧥"
  }
];

let cart = [];

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

function displayProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = "<p>Aucun produit trouvé.</p>";
    return;
  }

  productsContainer.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">${product.image}</div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>

        <div class="product-bottom">
          <span class="price">${product.price.toFixed(2)} €</span>
          <button class="add-button" onclick="addToCart(${product.id})">
            Ajouter
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(product => product.id === productId);
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateCart() {
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Votre panier est vide.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <br>
        ${item.quantity} × ${item.price.toFixed(2)} €
      </div>

      <button
        class="remove-button"
        onclick="removeFromCart(${item.id})"
      >
        Supprimer
      </button>
    </div>
  `).join("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotal.textContent = total.toFixed(2);
}

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);

cartButton.addEventListener("click", () => {
  cartModal.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.remove("active");
});

cartModal.addEventListener("click", event => {
  if (event.target === cartModal) {
    cartModal.classList.remove("active");
  }
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Votre panier est vide.");
  } else {
    alert("Merci pour votre commande !");
    cart = [];
    updateCart();
    cartModal.classList.remove("active");
  }
});

displayProducts();
updateCart();
