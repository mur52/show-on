/* =========================
   SHOW ON (Landing Page JS)
   Works on GitHub Pages
   ========================= */

const BRAND = {
  name: "Show On",
  tagline: "Premium Gents Clothing — Shirt, Pant, T-Shirt, Hoodie & New Arrival",
  phone: "01883329919",
  facebook:
    "https://www.facebook.com/people/Show-On/61565011457603/?rdid=sEkClXbZT4Y1A1L5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ALWSWUeBL%2F",
  location: "Mohora, Chattogram",
};

// ✅ Stable image links (Wikimedia - direct upload links)
const IMG = {
  tshirt1: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Men%27s_long-sleeve_T-shirt.jpg", // real t-shirt
  tshirt2: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Classical_polo_shirt.jpg", // polo tee
  shirt1: "https://upload.wikimedia.org/wikipedia/commons/4/47/Shirt.jpg", // shirt on hanger
  jeans1: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Jeans.jpg", // jeans
  jeans2: "https://upload.wikimedia.org/wikipedia/commons/0/01/Jeans_Jeans_Jeans.jpg", // denim outfit (lifestyle)
  hoodie1: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Hoodie_man.jpg", // hoodie
};

// Fallback if any image fails
const FALLBACK_IMG = IMG.shirt1;

// Products (you can change name/price anytime)
const CATALOG = [
  {
    id: "tshirts",
    title: "T-Shirts",
    subtitle: "Premium men’s T-shirts collection.",
    items: [
      { name: "Premium Long-Sleeve Tee", price: 690, badge: "New Arrival", img: IMG.tshirt1 },
      { name: "Classic Polo Tee", price: 790, badge: "Best Seller", img: IMG.tshirt2 },
      { name: "Everyday Tee", price: 590, badge: "Hot", img: IMG.tshirt1 },
      { name: "Minimal Tee", price: 650, badge: "New Arrival", img: IMG.tshirt1 },
      { name: "Drop Shoulder Tee", price: 720, badge: "Trending", img: IMG.tshirt2 },
      { name: "Summer Basic Tee", price: 560, badge: "Best Seller", img: IMG.tshirt1 },
    ],
  },
  {
    id: "shirts",
    title: "Shirts",
    subtitle: "Smart casual & formal shirts for gents.",
    items: [
      { name: "Formal Blue Shirt", price: 990, badge: "Best Seller", img: IMG.shirt1 },
      { name: "Office Wear Shirt", price: 950, badge: "Hot", img: IMG.shirt1 },
      { name: "Casual Shirt", price: 890, badge: "New Arrival", img: IMG.shirt1 },
      { name: "Button-Down Shirt", price: 920, badge: "Trending", img: IMG.shirt1 },
      { name: "Premium Cotton Shirt", price: 1050, badge: "New Arrival", img: IMG.shirt1 },
    ],
  },
  {
    id: "pants",
    title: "Pants",
    subtitle: "Comfortable & durable pants/denim for everyday wear.",
    items: [
      { name: "Classic Denim Jeans", price: 1290, badge: "Best Seller", img: IMG.jeans1 },
      { name: "Slim Fit Jeans", price: 1390, badge: "Trending", img: IMG.jeans1 },
      { name: "Street Denim", price: 1490, badge: "Hot", img: IMG.jeans2 },
      { name: "Everyday Jeans", price: 1190, badge: "New Arrival", img: IMG.jeans1 },
      { name: "Premium Denim", price: 1590, badge: "Best Seller", img: IMG.jeans2 },
    ],
  },
  {
    id: "hoodies",
    title: "Hoodies",
    subtitle: "Warm & stylish hoodies for all seasons.",
    items: [
      { name: "Classic Black Hoodie", price: 1690, badge: "Best Seller", img: IMG.hoodie1 },
      { name: "Winter Hoodie", price: 1790, badge: "Hot", img: IMG.hoodie1 },
      { name: "Zip Hoodie", price: 1890, badge: "New Arrival", img: IMG.hoodie1 },
      { name: "Premium Hoodie", price: 1990, badge: "Trending", img: IMG.hoodie1 },
      { name: "Everyday Hoodie", price: 1590, badge: "Best Seller", img: IMG.hoodie1 },
    ],
  },
  {
    id: "new",
    title: "New Arrival",
    subtitle: "Fresh drops — DM us on Facebook to order.",
    items: [
      { name: "New Drop Tee", price: 690, badge: "New Arrival", img: IMG.tshirt1 },
      { name: "New Polo Tee", price: 790, badge: "New Arrival", img: IMG.tshirt2 },
      { name: "New Shirt", price: 990, badge: "New Arrival", img: IMG.shirt1 },
      { name: "New Denim", price: 1390, badge: "New Arrival", img: IMG.jeans1 },
      { name: "New Hoodie", price: 1790, badge: "New Arrival", img: IMG.hoodie1 },
    ],
  },
];

// ---------- Helpers ----------
function moneyBDT(n) {
  return `৳${Number(n).toLocaleString("en-US")}`;
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast("Copied ✅");
  });
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add("show"), 10);
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 1600);
}

function openFBMessage(productName) {
  // This just opens your Facebook page; customer can inbox you.
  window.open(BRAND.facebook, "_blank");
}

// ---------- Render ----------
function renderBrand() {
  const brandName = document.querySelector("[data-brand-name]");
  const tagline = document.querySelector("[data-brand-tagline]");
  const phone = document.querySelector("[data-brand-phone]");
  const fb = document.querySelector("[data-brand-fb]");

  if (brandName) brandName.textContent = BRAND.name;
  if (tagline) tagline.textContent = BRAND.tagline;
  if (phone) phone.textContent = BRAND.phone;
  if (fb) fb.href = BRAND.facebook;

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
}

function productCardHTML(item) {
  const safeName = item.name.replace(/"/g, "&quot;");
  return `
    <div class="p-card">
      <div class="p-imgwrap">
        <img class="p-img" src="${item.img}" alt="${safeName}"
          loading="lazy"
          onerror="this.onerror=null; this.src='${FALLBACK_IMG}';" />
        <span class="p-badge">${item.badge || "New"}</span>
      </div>
      <div class="p-body">
        <div class="p-title">${item.name}</div>
        <div class="p-price">${moneyBDT(item.price)}</div>

        <div class="p-actions">
          <button class="btn btn-primary" onclick="openFBMessage('${safeName}')">Order Now</button>
          <button class="btn btn-ghost" onclick="copyText('${BRAND.phone}')">Copy Number</button>
        </div>
      </div>
    </div>
  `;
}

function sectionHTML(section) {
  return `
    <section class="section" id="${section.id}">
      <div class="section-head">
        <h2>${section.title}</h2>
        <p>${section.subtitle}</p>
      </div>
      <div class="grid">
        ${section.items.map(productCardHTML).join("")}
      </div>
    </section>
  `;
}

function renderCatalog() {
  const mount = document.querySelector("#catalog");
  if (!mount) return;

  mount.innerHTML = CATALOG.map(sectionHTML).join("");
}

// Run
document.addEventListener("DOMContentLoaded", () => {
  renderBrand();
  renderCatalog();
});
