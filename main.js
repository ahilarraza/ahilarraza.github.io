// main.js

document.addEventListener("DOMContentLoaded", () => {
  setupReadMoreToggle();
  setupContactFormValidation();
  setupRoiCalculator();
});

/**
 * Read more / less toggle on homepage
 */
function setupReadMoreToggle() {
  const btn = document.getElementById("readMoreBtn");
  const extra = document.getElementById("howItWorksExtra");

  if (!btn || !extra) return;

  btn.addEventListener("click", () => {
    const isHidden = extra.style.display === "" || extra.style.display === "none";
    extra.style.display = isHidden ? "block" : "none";
    btn.textContent = isHidden ? "Read less" : "Read more";
  });
}

/**
 * Contact form validation
 */
function setupContactFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMsg = document.getElementById("formSuccess");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    successMsg.textContent = "";

    // Reset previous errors
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove("error");
    });
    [nameError, emailError, messageError].forEach((el) => {
      el.textContent = "";
    });

    // Name validation
    if (!nameInput.value.trim()) {
      isValid = false;
      nameInput.classList.add("error");
      nameError.textContent = "Please enter your name.";
    }

    // Email validation
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      isValid = false;
      emailInput.classList.add("error");
      emailError.textContent = "Email is required.";
    } else if (!emailPattern.test(emailValue)) {
      isValid = false;
      emailInput.classList.add("error");
      emailError.textContent = "Please enter a valid email address.";
    }

    // Message validation
    if (!messageInput.value.trim()) {
      isValid = false;
      messageInput.classList.add("error");
      messageError.textContent = "Please write a short message.";
    }

    if (isValid) {
      successMsg.textContent = "Thanks for your message! This is a prototype form (no data is sent).";
      form.reset();
    }
  });
}

/**
 * Simple ROI estimator on Features page
 */
function setupRoiCalculator() {
  const roiButton = document.getElementById("roiButton");
  const leadsInput = document.getElementById("leadsPerWeek");
  const minutesInput = document.getElementById("minutesPerLead");
  const result = document.getElementById("roiResult");

  if (!roiButton || !leadsInput || !minutesInput || !result) return;

  roiButton.addEventListener("click", () => {
    const leads = Number(leadsInput.value);
    const minutes = Number(minutesInput.value);

    if (!leads || leads <= 0 || !minutes || minutes <= 0) {
      result.textContent = "Please enter realistic numbers to estimate hours saved per week.";
      return;
    }

    // Very simple fictional estimate:
    // current time: leads * minutes
    // with VAIN we assume 40% time saved
    const currentMinutes = leads * minutes;
    const savedMinutes = currentMinutes * 0.4;
    const savedHours = savedMinutes / 60;

    result.textContent = `VAIN could save approximately ${savedHours.toFixed(
      1
    )} hours of manual intake time per week (fictional example).`;
  });
}
