document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MOBILE MENU
  // =========================
  const menuBtn = document.querySelector("#menuBtn");
  const navMenu = document.querySelector("#navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");

      menuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.textContent = "☰";
      });
    });
  }

  // =========================
  // HERO SLIDER
  // Current HTML has one hero.
  // This changes the text/content
  // until you add image slides.
  // =========================
  const slideNumber = document.querySelector(".slide-number");
  const slideText = document.querySelector(".hero-slide-info span:last-child");
  const heroTitle = document.querySelector(".hero h1");
  const heroCopy = document.querySelector(".hero-copy");
  const prevSlide = document.querySelector("#prevSlide");
  const nextSlide = document.querySelector("#nextSlide");

  const heroSlides = [
    {
      number: "01",
      label: "NEW ERA. SAME AMBITION.",
      title: "DRIVEN BY<br><span>EVERY DETAIL.</span>",
      copy: "Precision. Performance. Relentless ambition. Welcome to the home of the Silver Arrows."
    },
    {
      number: "02",
      label: "BUILT FOR THE NEXT ERA.",
      title: "ENGINEERED<br><span>TO EVOLVE.</span>",
      copy: "A new chapter of Formula One begins with new ideas, new regulations and a relentless pursuit of speed."
    },
    {
      number: "03",
      label: "RACE WEEKEND. FULL COMMITMENT.",
      title: "EVERY LAP.<br><span>EVERY DECISION.</span>",
      copy: "From Brackley to the grid, every detail is focused on one outcome: competing at the front."
    },
    {
      number: "04",
      label: "THE SILVER ARROWS.",
      title: "ONE TEAM.<br><span>ONE AMBITION.</span>",
      copy: "Drivers, engineers and fans united by the pursuit of performance."
    }
  ];

  let currentSlide = 0;

  function updateHeroSlide() {
    if (!slideNumber || !slideText || !heroTitle || !heroCopy) return;

    const slide = heroSlides[currentSlide];

    slideNumber.textContent = slide.number;
    slideText.textContent = slide.label;
    heroTitle.innerHTML = slide.title;
    heroCopy.textContent = slide.copy;
  }

  function nextHeroSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlide();
  }

  function previousHeroSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide();
  }

  if (nextSlide) nextSlide.addEventListener("click", nextHeroSlide);
  if (prevSlide) prevSlide.addEventListener("click", previousHeroSlide);

  setInterval(nextHeroSlide, 6500);

  // =========================
  // SEARCH MODAL
  // =========================
  const searchBtn = document.querySelector("#searchBtn");
  const searchModal = document.querySelector("#searchModal");
  const closeSearch = document.querySelector("#closeSearch");
  const siteSearch = document.querySelector("#siteSearch");
  const searchResults = document.querySelector("#searchResults");

  const searchableItems = [
    { title: "Latest Stories", target: "#latest" },
    { title: "Tough Afternoon in Barcelona", target: "#latest" },
    { title: "New Regulations. New Opportunity.", target: "#latest" },
    { title: "Inside the Factory", target: "#latest" },
    { title: "How a Formula One Team Finds Speed", target: "#latest" },
    { title: "The 2026 Car", target: "#season" },
    { title: "George Russell", target: "#team" },
    { title: "Kimi Antonelli", target: "#team" },
    { title: "Interactive Experiences", target: "#fans" },
    { title: "Team Merchandise", target: ".merch-section" }
  ];

  if (searchBtn && searchModal) {
    searchBtn.addEventListener("click", () => {
      searchModal.classList.add("active");
      siteSearch.focus();
    });
  }

  if (closeSearch && searchModal) {
    closeSearch.addEventListener("click", () => {
      searchModal.classList.remove("active");
    });
  }

  if (siteSearch) {
    siteSearch.addEventListener("input", () => {
      const query = siteSearch.value.toLowerCase().trim();

      if (query === "") {
        searchResults.innerHTML = "";
        return;
      }

      const matches = searchableItems.filter((item) =>
        item.title.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
        return;
      }

      searchResults.innerHTML = matches
        .map(
          (item) =>
            `<a class="search-result" href="${item.target}">${item.title} →</a>`
        )
        .join("");
    });
  }

  // =========================
  // DRIVER PROFILE MODAL
  // =========================
  const driverModal = document.querySelector("#driverModal");
  const closeDriver = document.querySelector("#closeDriver");
  const driverName = document.querySelector("#driverName");
  const driverDescription = document.querySelector("#driverDescription");
  const driverButtons = document.querySelectorAll(".driver-profile-btn");

  const driverData = {
    "George Russell":
      "George Russell is one of Mercedes' leading drivers, known for his qualifying pace, technical feedback and controlled racecraft.",
    "Kimi Antonelli":
      "Kimi Antonelli represents the next generation of Formula One talent, bringing ambition, speed and a sharp learning curve to the Silver Arrows."
  };

  driverButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedDriver = button.dataset.driver;

      driverName.textContent = selectedDriver.toUpperCase();
      driverDescription.textContent = driverData[selectedDriver];
      driverModal.classList.add("active");
    });
  });

  if (closeDriver) {
    closeDriver.addEventListener("click", () => {
      driverModal.classList.remove("active");
    });
  }

  // =========================
  // NEWSLETTER FORM
  // Saves subscriptions in browser
  // =========================
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector("input[type='email']");
      const email = emailInput.value.trim();

      const subscribers =
        JSON.parse(localStorage.getItem("mercedesFanSubscribers")) || [];

      if (subscribers.includes(email)) {
        alert("This email is already subscribed.");
        return;
      }

      subscribers.push(email);

      localStorage.setItem(
        "mercedesFanSubscribers",
        JSON.stringify(subscribers)
      );

      alert("You are now signed up for Mercedes F1 fan updates.");
      newsletterForm.reset();
    });
  }

  // =========================
  // PRODUCT CARDS
  // =========================
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productName =
        card.dataset.product || card.querySelector("h3").textContent;

      alert(`${productName} added to your fan-store wishlist.`);
    });
  });

  // =========================
  // INTERACTIVE EXPERIENCE LINKS
  // =========================
  const experienceLinks = document.querySelectorAll(".experience-card a");

  experienceLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const title = link.closest(".experience-card").querySelector("h3").textContent;

      alert(`${title} will be available soon in this fan-made concept.`);
    });
  });

  // =========================
  // BACK TO TOP
  // =========================
  const backToTop = document.querySelector("#backToTop");

  window.addEventListener("scroll", () => {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =========================
  // CLOSE MODALS ON OUTSIDE CLICK
  // =========================
  window.addEventListener("click", (event) => {
    if (event.target === searchModal) {
      searchModal.classList.remove("active");
    }

    if (event.target === driverModal) {
      driverModal.classList.remove("active");
    }
  });
});