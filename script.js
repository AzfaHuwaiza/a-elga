// Category Menu
const categoryButtons = document.querySelectorAll(".category-btn");
const menuCategories = document.querySelectorAll(".menu-category");

function setActiveCategory(clickedBtn) {
  categoryButtons.forEach((btn) => {
    if (btn === clickedBtn) {
      btn.classList.add("bg-red-500", "text-white", "shadow-lg");
      btn.classList.remove("bg-red-100", "text-red-700", "hover:bg-red-200");
    } else {
      btn.classList.remove("bg-red-500", "text-white", "shadow-lg");
      btn.classList.add("bg-red-100", "text-red-700", "hover:bg-red-200");
    }
  });
}

function showCategory(categoryName) {
  menuCategories.forEach((cat) => {
    const category = cat.getAttribute("data-category");
    if (category === categoryName) {
      cat.classList.remove("hidden");
    } else {
      cat.classList.add("hidden");
    }
  });
}

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedCategory = btn.textContent.trim();
    setActiveCategory(btn);
    showCategory(selectedCategory);
  });
});

// Initialize showing 'Semua' category
document.addEventListener("DOMContentLoaded", () => {
  showCategory("Semua");
});

// Carousel
const slides = document.getElementById("carouselSlides");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("carouselDots");
const totalSlides = slides.children.length;
let currentIndex = 0;
let slideWidth = 0;
let intervalId;

function updateSlidePosition() {
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateDots();
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-yellow-400", i === currentIndex);
    dot.classList.toggle("bg-white", i !== currentIndex);
  });
}

function createDots() {
  for (let i = 0; i < totalSlides; i++) {
    const btn = document.createElement("button");
    btn.className = "w-3 h-3 rounded-full bg-white opacity-75 hover:opacity-100 transition mx-1";
    btn.setAttribute("aria-label", `Slide ${i + 1}`);
    btn.addEventListener("click", () => {
      currentIndex = i;
      updateSlidePosition();
      resetInterval();
    });
    dotsContainer.appendChild(btn);
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
}

function resetInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 5000);
}

window.addEventListener("resize", () => {
  slideWidth = slides.clientWidth;
  updateSlidePosition();
});

function initCarousel() {
  slideWidth = slides.clientWidth;
  createDots();
  updateSlidePosition();
  intervalId = setInterval(nextSlide, 5000);
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });
}

window.onload = initCarousel;

// Order Handling
function handleOrder(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const orderDetails = document.getElementById("orderDetails").value.trim();

  if (!name || !phone || !orderDetails) {
    alert("Mohon isi semua form dengan benar.");
    return;
  }

  let phoneFormatted = phone;
  if (phone.startsWith("0")) {
    phoneFormatted = "+62" + phone.slice(1);
  } else if (!phone.startsWith("+")) {
    phoneFormatted = "+62" + phone;
  }

  const message = `Halo, saya *${name}*. Saya ingin memesan catering dengan detail berikut:%0A${orderDetails}`;
  const waUrl = `https://wa.me/${phoneFormatted}?text=${encodeURIComponent(message)}`;

  window.open(waUrl, "_blank");
}

// Fungsi untuk membuka modal dengan gambar yang dipilih
function openModal(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});
