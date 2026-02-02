(() => {
  // ========= Brand config =========
  const BRAND = {
    name: "Show On",
    phone: "01883329919",
    fbUrl: "https://www.facebook.com/people/Show-On/61565011457603/?rdid=sEkClXbZT4Y1A1L5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ALWSWUeBL%2F"
  };

  const telLink = `tel:${BRAND.phone}`;

  // ========= Helpers =========
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"
    }[m]));

  // ========= Bind links =========
  const bindLink = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.href = href;
  };
  const bindFb = (id) => {
    const el = document.getElementById(id);
    if (el) el.href = BRAND.fbUrl;
  };

  [
    "phoneTop","phoneHero","phoneOffer","phoneFooter","phoneCTA","phoneBottom","phoneMobile"
  ].forEach(id => bindLink(id, telLink));

  [
    "fbTop","fbNav","fbHero","fbArrivals","fbOffer","fbFooter","fbCTA","fbBottom","fbMobile"
  ].forEach(id => bindFb(id));

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========= Mobile menu =========
  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.setAttribute("aria-hidden", String(expanded));
    });

    // Close menu on link click
    $$("#mobileMenu a").forEach(a => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // ========= Slider =========
  const slides = $$("#slider .slide");
  const dotsWrap = $("#sliderDots");
  let current = 0;
  let timer = null;

  function setSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    if (dotsWrap) {
      $$("#sliderDots .dot").forEach((d, i) => d.classList.toggle("is-active", i === current));
    }
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => setSlide(current + 1), 4500);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  if (slides.length) {
    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) =>
        `<button class="dot ${i === 0 ? "is-active" : ""}" aria-label="Go to slide ${i + 1}" data-i="${i}"></button>`
      ).join("");
      $$("#sliderDots .dot").forEach(btn => {
        btn.addEventListener("click", () => {
          setSlide(parseInt(btn.dataset.i, 10));
          startAuto();
        });
      });
    }

    const prev = $("#prevSlide");
    const next = $("#nextSlide");
    if (prev) prev.addEventListener("click", () => { setSlide(current - 1); startAuto(); });
    if (next) next.addEventListener("click", () => { setSlide(current + 1); startAuto(); });

    // Pause on hover (desktop)
    const slider = $("#slider");
    if (slider) {
      slider.addEventListener("mouseenter", stopAuto);
      slider.addEventListener("mouseleave", startAuto);
    }

    setSlide(0);
    startAuto();
  }

  // ========= Products data =========
  const products = [
    // New Arrivals
    { id:"NA-001", type:"new", category:"tshirts", name:"Premium Cotton T-Shirt", price:690, tag:"New Arrival", img:"https://picsum.photos/seed/showon-na1/800/600" },
    { id:"NA-002", type:"new", category:"hoodies", name:"Streetwear Hoodie", price:1490, tag:"New Arrival", img:"https://picsum.photos/seed/showon-na2/800/600" },
    { id:"NA-003", type:"new", category:"shirts", name:"Casual Men’s Shirt", price:1190, tag:"New Arrival", img:"https://picsum.photos/seed/showon-na3/800/600" },
    { id:"NA-004", type:"new", category:"pants", name:"Slim Fit Pant", price:1390, tag:"New Arrival", img:"https://picsum.photos/seed/showon-na4/800/600" },
    { id:"NA-005", type:"new", category:"tshirts", name:"Drop Shoulder T-Shirt", price:790, tag:"New Arrival", img:"https://picsum.photos/seed/showon-na5/800/600" },
    { id:"NA-006", type:"new", category:"tshirts", name:"Minimal Logo Tee", price:650, tag:"New Arrival", img:"https://picsum.photos/seed/showon-na6/800/600" },

    // Best Sellers
    { id:"BS-001", type:"best", category:"tshirts", name:"Everyday Basic T-Shirt", price:590, tag:"Best Seller", img:"https://picsum.photos/seed/showon-bs1/800/600" },
    { id:"BS-002", type:"best", category:"shirts", name:"Formal Shirt (Classic)", price:1290, tag:"Best Seller", img:"https://picsum.photos/seed/showon-bs2/800/600" },
    { id:"BS-003", type:"best", category:"pants", name:"Comfort Jogger Pant", price:990, tag:"Best Seller", img:"https://picsum.photos/seed/showon-bs3/800/600" },
    { id:"BS-004", type:"best", category:"hoodies", name:"Winter Hoodie (Warm)", price:1590, tag:"Best Seller", img:"https://picsum.photos/seed/showon-bs4/800/600" },
    { id:"BS-005", type:"best", category:"tshirts", name:"Printed T-Shirt", price:720, tag:"Best Seller", img:"https://picsum.photos/seed/showon-bs5/800/600" },
    { id:"BS-006", type:"best", category:"shirts", name:"Casual Checked Shirt", price:1150, tag:"Best Seller", img:"https://picsum.photos/seed/showon-bs6/800/600" }
  ];

  function renderProductCard(p) {
    const orderText = encodeURIComponent(
      `Hello ${BRAND.name}! I want to order:\n` +
      `Product: ${p.name}\n` +
      `ID: ${p.id}\n` +
      `Price: ৳${p.price}\n` +
      `Size: (S/M/L/XL)\n` +
      `Quantity: \n` +
      `Delivery Address: \n`
    );

    // Facebook doesn't reliably support prefilling message text for all page types.
    // So we provide a "copy message" approach + open the FB page.
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
            <button class="btn btn--ghost" type="button" data-copy="${orderText}">Copy Msg</button>
          </div>
        </div>
      </article>
    `;
  }

  function mountProducts() {
    const arrivals = products.filter(p => p.type === "new");
    const best = products.filter(p => p.type === "best");

    const arrivalsGrid = $("#newArrivalsGrid");
    const bestGrid = $("#bestSellersGrid");

    if (arrivalsGrid) arrivalsGrid.innerHTML = arrivals.map(renderProductCard).join("");
    if (bestGrid) bestGrid.innerHTML = best.map(renderProductCard).join("");

    // Copy buttons on product cards
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
  }

  mountProducts();

  // ========= Search filter (searches within shown product cards) =========
  const searchInput = $("#searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      const cards = $$(".card");
      cards.forEach(card => {
        const name = card.getAttribute("data-name") || "";
        const show = !q || name.includes(q);
        card.style.display = show ? "" : "none";
      });
    });
  }

  // ========= Contact form =========
  const form = $("#contactForm");
  const status = $("#formStatus");
  const after = $("#afterSubmit");
  const genText = $("#generatedText");
  const copyBtn = $("#copyBtn");
  const openFbBtn = $("#openFbBtn");

  if (openFbBtn) openFbBtn.href = BRAND.fbUrl;

  function setStatus(msg, isError=false) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? "#ffb4b4" : "";
  }

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

      // Clear form fields (optional)
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
