// Hero Slider
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Product Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const productGrid = document.querySelector(".product-grid");

// Sample product data (replace with actual data from backend)
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 29.99,
    category: "men",
    image: "assets/products/tshirt.jpg",
  },
  {
    id: 2,
    name: "Summer Dress",
    price: 49.99,
    category: "women",
    image: "assets/products/dress.jpg",
  },
  // Add more products as needed
];

function createProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;
}

function filterProducts(category) {
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  productGrid.innerHTML = filteredProducts
    .map((product) => createProductCard(product))
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterProducts(button.dataset.category);
  });
});

// Shopping Cart
let cart = [];

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartIcon();
    showNotification("Product added to cart!");
  }
}

function updateCartIcon() {
  const cartIcon = document.querySelector(".cart a");
  if (cart.length > 0) {
    cartIcon.setAttribute("data-count", cart.length);
  } else {
    cartIcon.removeAttribute("data-count");
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Search Functionality
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  productGrid.innerHTML = filteredProducts
    .map((product) => createProductCard(product))
    .join("");
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// Newsletter Form
const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value;

  // Add your newsletter subscription logic here
  showNotification("Thank you for subscribing to our newsletter!");
  newsletterForm.reset();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Initialize the product grid with all products
filterProducts("all");
