
// ================== Sample Product List ==================
const sampleProducts = [
  { name: "Cricket Bat", price: 2500, image: "images/cricket_bat.jpg" },
  { name: "Football", price: 1200, image: "images/football.png" },
  { name: "Basketball", price: 950, image: "images/basketball.jpg" },
  { name: "Tennis Racket", price: 1700, image: "images/tennis_racket.jpg" },
  { name: "Helmet", price: 1100, image: "images/helmet.png" },
  { name: "Running Shoes", price: 3000, image: "images/shoes.jpg" },
  { name: "Skipping Rope", price: 350, image: "images/rope.jpg" },
  { name: "Boxing Gloves", price: 1450, image: "images/gloves.jpg" }
];

// ================== Cart Functions ==================
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === product.name);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart`);
  updateCartCount();
}

function addToCartByName(productName) {
  const product = sampleProducts.find(p => p.name === productName);
  addToCart(product);
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPage();
  updateCartCount();
}

function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartPage();
    updateCartCount();
  }
}

function renderCartPage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const table = document.querySelector(".cart table");
  if (!table) return;
  const tbody = table.querySelector("tbody") || table;
  tbody.innerHTML = '<tr><th>Item</th><th>Quantity</th><th>Price</th><th>Total</th><th>Action</th></tr>';
  let total = 0;
  cart.forEach((item, i) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>
          <button onclick="updateQuantity(${i}, -1)">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${i}, 1)">+</button>
        </td>
        <td>₹${item.price}</td>
        <td>₹${itemTotal}</td>
        <td><button onclick="removeFromCart(${i})">Remove</button></td>
      </tr>`;
  });
  tbody.innerHTML += `
    <tr>
      <td colspan="3"><strong>Total</strong></td>
      <td colspan="2"><strong>₹${total}</strong></td>
    </tr>`;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  const elements = document.querySelectorAll("#cartCount");
  elements.forEach(el => el.textContent = total);
}

// ================== Page-Specific Logic ==================
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  if (window.location.pathname.includes("products.html")) {
    const productContainer = document.querySelector(".products");
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(products => {
        productContainer.innerHTML = "";
        products.forEach(p => {
          productContainer.innerHTML += `
            <div class="product-card">
              <img src="${p.image}" alt="${p.name}">
              <h3>${p.name}</h3>
              <p>₹${p.price}</p>
              <button class="btn" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
            </div>`;
        });
      })
      .catch(err => console.error("Failed to load products", err));
  }

  if (window.location.pathname.includes("cart.html")) {
    renderCartPage();
    const btn = document.querySelector(".btn");
    if (btn) {
      btn.addEventListener("click", async () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartItems.length === 0) return alert("Cart is empty.");
        try {
          const res = await fetch("http://localhost:8080/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems })
          });
          if (res.ok) {
            const data = await res.json();
            alert("Order placed! Order No: " + data.orderNumber);
            localStorage.removeItem("cart");
            location.reload();
          } else {
            alert("Order failed.");
          }
        } catch (err) {
          alert("Server error");
          console.error(err);
        }
      });
    }
  }

  if (window.location.pathname.includes("login.html")) {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        const role = this.role.value;
        try {
          const res = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role })
          });
          if (res.ok) {
            const result = await res.json();
            alert("Login successful!");
            localStorage.setItem("user", JSON.stringify(result));
            if (role === "admin") location.href = "admin-dashboard.html";
            else location.href = "products.html";
          } else {
            alert("Invalid login.");
          }
        } catch (err) {
          alert("Server error");
          console.error(err);
        }
      });
    }
  }

  if (window.location.pathname.includes("register.html")) {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = this.name.value;
        const email = this.email.value;
        const password = this.password.value;
        try {
          const res = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
          });
          if (res.ok) {
            alert("Registration successful!");
            location.href = "login.html";
          } else {
            alert("Registration failed.");
          }
        } catch (err) {
          alert("Error connecting to server");
          console.error(err);
        }
      });
    }
  }
});
// ================== Admin Login Handler ==================
if (window.location.pathname.includes("admin-login.html")) {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("adminEmail").value;
      const password = document.getElementById("adminPassword").value;

      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "admin" })
      });

      const msg = await res.text();
      alert(msg);
      if (msg.toLowerCase().includes("success")) {
        window.location.href = "admin.html";
      }
    });
  }
}
