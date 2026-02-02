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
  const FALLBACK_IMG = "assets/img/t1.jpg"; // fallback if any image fails

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
  // Products (YOUR LOCAL IMAGES)
  // NOTE: shirts have spaces -> use %20
  // =========================
  const products = [
    // T-SHIRTS (t1 - t5)
    { id:"TS-001", type:"new",  category:"tshirts", name:"T-Shirt 01", price:690, tag:"New Arrival", img:"assets/img/t1.jpg" },
    { id:"TS-002", type:"new",  category:"tshirts", name:"T-Shirt 02", price:790, tag:"New Arrival", img:"assets/img/t2.jpg" },
    { id:"TS-003", type:"best", category:"tshirts", name:"T-Shirt 03", price:650, tag:"Best Seller", img:"assets/img/t3.jpg" },
    { id:"TS-004", type:"best", category:"tshirts", name:"T-Shirt 04", price:590, tag:"Best Seller", img:"assets/img/t4.jpg" },
    { id:"TS-005", type:"best", category:"tshirts", name:"T-Shirt 05", price:720, tag:"Best Seller", img:"assets/img/t5.jpg" },

    // SHIRTS (shirt 1 - shirt 5)
    { id:"SH-001", type:"new",  category:"shirts", name:"Shirt 01", price:1190, tag:"New Arrival", img:"assets/img/shirt%201.jpg" },
    { id:"SH-002", type:"new",  category:"shirts", name:"Shirt 02", price:1290, tag:"New Arrival", img:"assets/img/shirt%202.jpg" },
    { id:"SH-003", type:"best", category:"shirts", name:"Shirt 03", price:1150, tag:"Best Seller", img:"assets/img/shirt%203.jpg" },
    { id:"SH-004", type:"best", category:"shirts", name:"Shirt 04", price:1390, tag:"Best Seller", img:"assets/img/shirt%204.jpg" },
    { id:"SH-005", type:"best", category:"shirts", name:"Shirt 05", price:1350, tag:"Best Seller", img:"assets/img/shirt%205.jpg" },

    // PANTS (p1 - p5)
    { id:"PT-001", type:"new",  category:"pants", name:"Pant 01", price:1390, tag:"New Arrival", img:"assets/img/p1.jpg" },
    { id:"PT-002", type:"new",  category:"pants", name:"Pant 02", price:1490, tag:"New Arrival", img:"assets/img/p2.jpg" },
    { id:"PT-003", type:"best", category:"pants", name:"Pant 03", price:990,  tag:"Best Seller", img:"assets/img/p3.jpg" },
    { id:"PT-004", type:"best", category:"pants", name:"Pant 04", price:1590, tag:"Best Seller", img:"assets/img/p4.jpg" },
    { id:"PT-005", type:"best", category:"pants", name:"Pant 05", price:1690, tag:"Best Seller", img:"assets/img/p5.jpg" },

    // HOODIES (h1 - h5)
    { id:"HD-001", type:"new",  category:"hoodies", name:"Hoodie 01", price:1490, tag:"New Arrival", img:"assets/img/h1.jpg" },
    { id:"HD-002", type:"new",  category:"hoodies", name:"Hoodie 02", price:1590, tag:"New Arrival", img:"assets/img/h2.jpg" },
    { id:"HD-003", type:"best", category:"hoodies", name:"Hoodie 03", price:1450, tag:"Best Seller", img:"assets/img/h3.jpg" },
    { id:"HD-004", type:"best", category:"hoodies", name:"Hoodie 04", price:1690, tag:"Best Seller", img:"assets/img/h4.jpg" },
    { id:"HD-005", type:"best", category:"hoodies", name:"Hoodie 05", price:1750, tag:"Best Seller", img:"assets/img/h5.jpg" },
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
          <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy"
               onerror="this.onerror=null; this.src='${FALLBACK_IMG}';" />
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
  // Mount sections
  // =========================
  const newArrivals = products.filter((p) => p.type === "new");
  const bestSellers = products.filter((p) => p.type === "best");

  mountGrid("newArrivalsGrid", newArrivals);
  mountGrid("bestSellersGrid", bestSellers);

  // Category sections (only works if you added these containers in index.html)
  mountGrid("tshirtsGrid", products.filter((p) => p.category === "tshirts"));
  mountGrid("shirtsGrid", products.filter((p) => p.category === "shirts"));
  mountGrid("pantsGrid", products.filter((p) => p.category === "pants"));
  mountGrid("hoodiesGrid", products.filter((p) => p.category === "hoodies"));

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
  // Search filter
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
