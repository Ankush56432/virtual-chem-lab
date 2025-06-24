// ✅ Feature 1: Show greeting in console on load
window.addEventListener('load', () => {
  console.log("Welcome to Virtual Chemistry Lab 🔬");
});

// ✅ Feature 2: Show Current Year in Footer
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// ✅ Feature 3: Scroll to Top Button
window.onscroll = () => {
  const btn = document.getElementById("topBtn");
  if (btn) {
    btn.style.display = window.scrollY > 100 ? "block" : "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ✅ Feature 4: Contact Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields before submitting.");
        e.preventDefault(); // prevent form submission
      }
    });
  }
});
