(() => {
  // =========================
  // Brand config
  // =========================
  const BRAND = {
    name: "Show On",
    phone: "01883329919",
    fbUrl:
      "https://www.facebook.com/people/Show-On/61565011457603/?rdid=sEkClXbZT4Y1A1L5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ALWSWUeBL%2F",
  };

  const telLink = `tel:${BRAND.phone}`;

  // =========================
  // Helpers
  // =========================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));

  const safeLower = (s) => (s || "").toString().toLowerCase();

  // =========================
  // Bind links (phone + facebook)
  // =========================
  const bindLink = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.href = href;
  };

  const bindFb = (id) => {
    const el = document.getElementById(id);
    if (el) el.href = BRAND.fbUrl;
  };

  [
    "phoneTop",
    "phoneHero",
    "phoneOffer",
    "phoneFooter",
    "phoneCTA",
    "phoneBottom",
    "phoneMobile",
  ].forEach((id) => bindLink(id, telLink));

  [
    "fbTop",
    "fbNav",
    "fbHero",
    "fbArrivals",
    "fbOffer",
    "fbFooter",
    "fbCTA",
    "fbBottom",
    "fbMobile",
  ].forEach(bindFb);

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================
  // Mobile menu
  // =========================
  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.setAttribute("aria-hidden", String(expanded));
    });

    $$("#mobileMenu a").forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // =========================
  // Hero slider
  // =========================
  const slides = $$("#slider .slide");
  const dotsWrap = $("#sliderDots");
  let current = 0;
  let timer = null;

  const setSlide = (index) => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));

    if (dotsWrap) {
      $$("#sliderDots .dot").forEach((d, i) =>
        d.classList.toggle("is-active", i === current)
      );
    }
  };

  const stopAuto = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const startAuto = () => {
    stopAuto();
    timer = setInterval(() => setSlide(current + 1), 4500);
  };

  if (slides.length) {
    if (dotsWrap) {
      dotsWrap.innerHTML = slides
        .map(
          (_, i) =>
            `<button class="dot ${i === 0 ? "is-active" : ""}" aria-label="Go to slide ${
              i + 1
            }" data-i="${i}"></button>`
        )
        .join("");

      $$("#sliderDots .dot").forEach((btn) => {
        btn.addEventListener("click", () => {
          setSlide(parseInt(btn.dataset.i, 10));
          startAuto();
        });
      });
    }

    const prev = $("#prevSlide");
    const next = $("#nextSlide");

    if (prev)
      prev.addEventListener("click", () => {
        setSlide(current - 1);
        startAuto();
      });

    if (next)
      next.addEventListener("click", () => {
        setSlide(current + 1);
        startAuto();
      });

    const slider = $("#slider");
    if (slider) {
      slider.addEventListener("mouseenter", stopAuto);
      slider.addEventListener("mouseleave", startAuto);
    }

    setSlide(0);
    startAuto();
  }

  // =========================
  // Product data (category-based real images)
  // Using Unsplash Source keyword search images
  // =========================
  const products = [
    // ---------- T-SHIRTS ----------
    { id: "TS-001", type: "new",  category: "tshirts", name: "Premium Cotton T-Shirt", price: 690, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?mens,tshirt&sig=1" },
    { id: "TS-002", type: "new",  category: "tshirts", name: "Drop Shoulder T-Shirt",  price: 790, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?t-shirt,streetwear&sig=2" },
    { id: "TS-003", type: "new",  category: "tshirts", name: "Minimal Logo Tee",       price: 650, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?tshirt,fashion&sig=3" },
    { id: "TS-004", type: "best", category: "tshirts", name: "Everyday Basic Tee",     price: 590, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?mens,tee&sig=4" },
    { id: "TS-005", type: "best", category: "tshirts", name: "Printed T-Shirt",        price: 720, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?graphic,tshirt&sig=5" },

    // ---------- SHIRTS ----------
    { id: "SH-001", type: "new",  category: "shirts", name: "Casual Men’s Shirt",     price: 1190, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?mens,shirt&sig=11" },
    { id: "SH-002", type: "new",  category: "shirts", name: "Formal Shirt (Classic)", price: 1290, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?formal,shirt&sig=12" },
    { id: "SH-003", type: "best", category: "shirts", name: "Checked Casual Shirt",   price: 1150, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?checkered,shirt&sig=13" },
    { id: "SH-004", type: "best", category: "shirts", name: "Oxford Shirt",           price: 1390, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?oxford,shirt&sig=14" },
    { id: "SH-005", type: "best", category: "shirts", name: "Smart Casual Shirt",     price: 1350, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?buttondown,shirt&sig=15" },

    // ---------- PANTS ----------
    { id: "PT-001", type: "new",  category: "pants", name: "Slim Fit Pant",       price: 1390, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?mens,pants&sig=21" },
    { id: "PT-002", type: "new",  category: "pants", name: "Chino Pant",          price: 1490, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?chino,pants&sig=22" },
    { id: "PT-003", type: "best", category: "pants", name: "Comfort Jogger Pant", price: 990,  tag: "Best Seller", img: "https://source.unsplash.com/800x600/?jogger,pants&sig=23" },
    { id: "PT-004", type: "best", category: "pants", name: "Denim Jeans",         price: 1590, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?jeans,denim&sig=24" },
    { id: "PT-005", type: "best", category: "pants", name: "Cargo Pant",          price: 1690, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?cargo,pants&sig=25" },

    // ---------- HOODIES ----------
    { id: "HD-001", type: "new",  category: "hoodies", name: "Streetwear Hoodie",    price: 1490, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?hoodie,men&sig=31" },
    { id: "HD-002", type: "new",  category: "hoodies", name: "Winter Hoodie (Warm)", price: 1590, tag: "New Arrival", img: "https://source.unsplash.com/800x600/?mens,hoodie&sig=32" },
    { id: "HD-003", type: "best", category: "hoodies", name: "Minimal Hoodie",       price: 1450, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?black,hoodie&sig=33" },
    { id: "HD-004", type: "best", category: "hoodies", name: "Oversized Hoodie",     price: 1690, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?oversized,hoodie&sig=34" },
    { id: "HD-005", type: "best", category: "hoodies", name: "Zip Hoodie",           price: 1750, tag: "Best Seller", img: "https://source.unsplash.com/800x600/?zip,hoodie&sig=35" },
  ];

  // =========================
  // Render helpers
  // =========================
  const orderTemplate = (p) =>
    `Hello ${BRAND.name}! I want to order:\n` +
    `Product: ${p.name}\n` +
    `ID: ${p.id}\n` +
    `Price: ৳${p.price}\n` +
    `Size: (S/M/L/XL)\n` +
    `Quantity: \n` +
    `Delivery Address: \n`;

  const renderProductCard = (p) => {
    const copyPayload = encodeURIComponent(orderTemplate(p));

    return `
      <article class="card" data-name="${escapeHtml(p.name).toLowerCase()}" data-category="${p.category}">
        <div class="card__img">
          <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" />
        </div>
        <div class="card__body">
          <h3 class="card__title">${escapeHtml(p.name)}</h3>
          <div class="card__meta">
            <span class="price">৳${p.price}</span>
            <span class="tag">${escapeHtml(p.tag)}</span>
          </div>
          <div class="card__actions">
            <a class="btn btn--primary" href="${BRAND.fbUrl}" target="_blank" rel="noopener">Order Now</a>
            <button class="btn btn--ghost" type="button" data-copy="${copyPayload}">Copy Msg</button>
          </div>
        </div>
      </article>
    `;
  };

  const mountGrid = (elId, list) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = list.map(renderProductCard).join("");
  };

  // =========================
  // Mount sections (existing)
  // =========================
  const newArrivals = products.filter((p) => p.type === "new");
  const bestSellers = products.filter((p) => p.type === "best");

  mountGrid("newArrivalsGrid", newArrivals.slice(0, 8));
  mountGrid("bestSellersGrid", bestSellers.slice(0, 8));

  // =========================
  // OPTIONAL: Category sections
  // These require small HTML containers in index.html.
  // If containers don't exist, code will simply do nothing.
  // =========================
  mountGrid("tshirtsGrid", products.filter((p) => p.category === "tshirts").slice(0, 10));
  mountGrid("shirtsGrid", products.filter((p) => p.category === "shirts").slice(0, 10));
  mountGrid("pantsGrid", products.filter((p) => p.category === "pants").slice(0, 10));
  mountGrid("hoodiesGrid", products.filter((p) => p.category === "hoodies").slice(0, 10));

  // =========================
  // Copy buttons (product cards)
  // =========================
  document.body.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-copy]");
    if (!btn) return;

    const txt = decodeURIComponent(btn.getAttribute("data-copy") || "");

    try {
      await navigator.clipboard.writeText(txt);
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy Msg"), 1200);
    } catch {
      alert("Copy failed. Please copy manually:\n\n" + txt);
    }
  });

  // =========================
  // Search filter (filters all product cards on page)
  // =========================
  const searchInput = $("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = safeLower(searchInput.value.trim());
      const cards = $$(".card");
      cards.forEach((card) => {
        const name = safeLower(card.getAttribute("data-name") || "");
        card.style.display = !q || name.includes(q) ? "" : "none";
      });
    });
  }

  // =========================
  // Contact form
  // =========================
  const form = $("#contactForm");
  const status = $("#formStatus");
  const after = $("#afterSubmit");
  const genText = $("#generatedText");
  const copyBtn = $("#copyBtn");
  const openFbBtn = $("#openFbBtn");

  if (openFbBtn) openFbBtn.href = BRAND.fbUrl;

  const setStatus = (msg, isError = false) => {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? "#ffb4b4" : "";
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = ($("#name")?.value || "").trim();
      const phone = ($("#phone")?.value || "").trim();
      const message = ($("#message")?.value || "").trim();

      if (!name || !phone || !message) {
        setStatus("Please fill in all fields.", true);
        return;
      }

      // Bangladesh phone pattern (simple)
      if (!/^0\d{10}$/.test(phone)) {
        setStatus("Phone format should be like 01XXXXXXXXX (11 digits).", true);
        return;
      }

      const finalMsg =
        `Hello Show On,\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n\n` +
        `Order Details:\n${message}\n\n` +
        `Please confirm price, size availability, and delivery time. Thanks!`;

      if (genText) genText.value = finalMsg;
      if (after) after.hidden = false;

      setStatus("Thanks! Copy the message below and send it to our Facebook inbox.");

      // Clear form
      $("#name").value = "";
      $("#phone").value = "";
      $("#message").value = "";
    });
  }

  if (copyBtn && genText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(genText.value);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
      } catch {
        alert("Copy failed. Please copy manually.");
      }
    });
  }
})();
