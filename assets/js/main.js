// Show On - Product JS (GitHub Pages, local images)

document.addEventListener("DOMContentLoaded", () => {
  const BRAND = {
    name: "Show On",
    phone: "01883329919",
    fb:
      "https://www.facebook.com/people/Show-On/61565011457603/?rdid=sEkClXbZT4Y1A1L5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ALWSWUeBL%2F",
  };

  const FALLBACK_IMG = "assets/img/t1.jpg";

  // ✅ Products (your uploaded images)
  const products = [
    // T-shirts
    { id: "TS-001", cat: "tshirts", name: "T-Shirt 01", price: 690, tag: "New Arrival", img: "assets/img/t1.jpg" },
    { id: "TS-002", cat: "tshirts", name: "T-Shirt 02", price: 790, tag: "New Arrival", img: "assets/img/t2.jpg" },
    { id: "TS-003", cat: "tshirts", name: "T-Shirt 03", price: 650, tag: "Best Seller", img: "assets/img/t3.jpg" },
    { id: "TS-004", cat: "tshirts", name: "T-Shirt 04", price: 590, tag: "Best Seller", img: "assets/img/t4.jpg" },
    { id: "TS-005", cat: "tshirts", name: "T-Shirt 05", price: 720, tag: "Best Seller", img: "assets/img/t5.jpg" },

    // Shirts
    { id: "SH-001", cat: "shirts", name: "Shirt 01", price: 1190, tag: "New Arrival", img: "assets/img/shirt1.jpg" },
    { id: "SH-002", cat: "shirts", name: "Shirt 02", price: 1290, tag: "New Arrival", img: "assets/img/shirt2.jpg" },
    { id: "SH-003", cat: "shirts", name: "Shirt 03", price: 1150, tag: "Best Seller", img: "assets/img/shirt3.jpg" },
    { id: "SH-004", cat: "shirts", name: "Shirt 04", price: 1390, tag: "Best Seller", img: "assets/img/shirt4.jpg" },
    { id: "SH-005", cat: "shirts", name: "Shirt 05", price: 1350, tag: "Best Seller", img: "assets/img/shirt5.jpg" },

    // Pants
    { id: "PT-001", cat: "pants", name: "Pant 01", price: 1390, tag: "New Arrival", img: "assets/img/p1.jpg" },
    { id: "PT-002", cat: "pants", name: "Pant 02", price: 1490, tag: "New Arrival", img: "assets/img/p2.jpg" },
    { id: "PT-003", cat: "pants", name: "Pant 03", price: 990,  tag: "Best Seller", img: "assets/img/p3.jpg" },
    { id: "PT-004", cat: "pants", name: "Pant 04", price: 1590, tag: "Best Seller", img: "assets/img/p4.jpg" },
    { id: "PT-005", cat: "pants", name: "Pant 05", price: 1690, tag: "Best Seller", img: "assets/img/p5.jpg" },

    // Hoodies
    { id: "HD-001", cat: "hoodies", name: "Hoodie 01", price: 1490, tag: "New Arrival", img: "assets/img/h1.jpg" },
    { id: "HD-002", cat: "hoodies", name: "Hoodie 02", price: 1590, tag: "New Arrival", img: "assets/img/h2.jpg" },
    { id: "HD-003", cat: "hoodies", name: "Hoodie 03", price: 1450, tag: "Best Seller", img: "assets/img/h3.jpg" },
    { id: "HD-004", cat: "hoodies", name: "Hoodie 04", price: 1690, tag: "Best Seller", img: "assets/img/h4.jpg" },
    { id: "HD-005", cat: "hoodies", name: "Hoodie 05", price: 1750, tag: "Best Seller", img: "assets/img/h5.jpg" },
  ];

  // ----------- helpers -----------
  const money = (n) => `৳${Number(n).toLocaleString("en-US")}`;

  function cardHTML(p) {
    return `
      <article class="card">
        <div class="card__img">
          <img src="${p.img}" alt="${p.name}" loading="lazy"
               onerror="this.onerror=null; this.src='${FALLBACK_IMG}';" />
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.name}</h3>
          <div class="card__meta">
            <span class="price">${money(p.price)}</span>
            <span class="tag">${p.tag}</span>
          </div>
          <div class="card__actions">
            <a class="btn btn--primary" href="${BRAND.fb}" target="_blank" rel="noopener">Order Now</a>
            <a class="btn btn--ghost" href="tel:${BRAND.phone}">Call</a>
          </div>
        </div>
      </article>
    `;
  }

  function mount(gridId, category) {
    const el = document.getElementById(gridId);
    if (!el) return;
    el.innerHTML = products.filter((x) => x.cat === category).map(cardHTML).join("");
  }

  // ✅ These IDs MUST exist in index.html
  mount("tshirtsGrid", "tshirts");
  mount("shirtsGrid", "shirts");
  mount("pantsGrid", "pants");
  mount("hoodiesGrid", "hoodies");
});
