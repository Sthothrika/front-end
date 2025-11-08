const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const successMessage = document.getElementById("successMessage");

// Utility: show error
function showError(input, message) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error");
  error.innerText = message;
  input.classList.add("invalid");
  input.classList.remove("valid");
}

// Utility: show success
function showSuccess(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error");
  error.innerText = "";
  input.classList.add("valid");
  input.classList.remove("invalid");
}

// Validate full name
function validateName() {
  if (fullName.value.trim() === "") {
    showError(fullName, "Full name is required");
    return false;
  } else {
    showSuccess(fullName);
    return true;
  }
}

// Validate email
function validateEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.value.trim())) {
    showError(email, "Enter a valid email address");
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}

// Validate password
function validatePassword() {
  const value = password.value.trim();
  if (value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    return false;
  } else if (!/[!@#$%^&*]/.test(value)) {
    showError(password, "Include at least one special character");
    return false;
  } else {
    showSuccess(password);
    return true;
  }
}

// Validate phone number
function validatePhone() {
  const re = /^[0-9]{10}$/;
  if (!re.test(phone.value.trim())) {
    showError(phone, "Enter a valid 10-digit phone number");
    return false;
  } else {
    showSuccess(phone);
    return true;
  }
}

// Real-time validation
fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
phone.addEventListener("input", validatePhone);

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPhoneValid = validatePhone();

  if (isNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
    successMessage.innerText = "Registration successful!";
    form.reset();
    document.querySelectorAll("input").forEach(input => {
      input.classList.remove("valid", "invalid");
    });
  } else {
    successMessage.innerText = "";
  }
});
