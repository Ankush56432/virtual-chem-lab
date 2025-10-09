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
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    document.getElementById('responseMsg').innerText = data.message || 'Message sent!';
  } catch (error) {
    document.getElementById('responseMsg').innerText = 'Error sending message!';
  }
});

// Register form
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      document.getElementById('regMessage').innerText = data.message;
    } catch (err) {
      document.getElementById('regMessage').innerText = 'Error connecting to server';
    }
  });
}
// Login form
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      document.getElementById('loginMessage').innerText = data.message;

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
      }
    } catch (err) {
      document.getElementById('loginMessage').innerText = 'Error connecting to server';
    }
  });
}
async function loadWorkshops() {
  try {
    const res = await fetch('http://localhost:5000/api/workshops');
    const workshops = await res.json();

    const container = document.getElementById('workshopContainer');
    container.innerHTML = '';

    workshops.forEach(ws => {
      const card = document.createElement('div');
      card.className = 'col-md-6 col-lg-4';
      card.innerHTML = `
        <div class="card shadow h-100">
          <img src="${ws.image}" class="card-img-top" alt="${ws.title}">
          <div class="card-body">
            <h5 class="card-title">${ws.title}</h5>
            <p class="card-text">${ws.description}</p>
            ${ws.status === 'upcoming' ? `<button class="btn btn-primary" onclick="registerWorkshop('${ws._id}', '${ws.title}')">Register</button>` : `<span class="badge bg-secondary">Completed</span>`}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

loadWorkshops();

// Open prompt to register
function registerWorkshop(id, title) {
  const name = prompt(`Enter your full name for ${title}`);
  const email = prompt('Enter your email');

  if (!name || !email) return alert('Name and Email are required');

  fetch('http://localhost:5000/api/workshops/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workshopId: id, name, email })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => alert('Error registering'));
}
