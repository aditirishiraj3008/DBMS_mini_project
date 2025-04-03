document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const nameField = document.getElementById("name");
    const phoneField = document.getElementById("phone");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleLink = document.getElementById("toggle-signup");
    const roleInputs = document.getElementsByName("role");

    let isSignup = false;

    // Toggle between login and signup
    toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        isSignup = !isSignup;
        formTitle.textContent = isSignup ? "Sign Up" : "Login";
        submitBtn.textContent = isSignup ? "Sign Up" : "Login";
        toggleLink.textContent = isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up";

        // Show/hide name and phone fields
        nameField.style.display = isSignup ? "block" : "none";
        phoneField.style.display = isSignup ? "block" : "none";
    });

    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorMessage.textContent = "";

        // Signup validations
        if (isSignup) {
            if (nameField.value.trim() === "") {
                errorMessage.textContent = "Please enter your full name.";
                return;
            }
            if (!validatePhone(phoneField.value)) {
                errorMessage.textContent = "Enter a valid 10-digit phone number.";
                return;
            }
        }

        if (!validateEmail(emailField.value)) {
            errorMessage.textContent = "Invalid email format";
            return;
        }
        if (passwordField.value.length < 6) {
            errorMessage.textContent = "Password must be at least 6 characters";
            return;
        }

        // Check selected role
        let selectedRole = null;
        for (let role of roleInputs) {
            if (role.checked) {
                selectedRole = role.value;
                break;
            }
        }

        if (!selectedRole) {
            errorMessage.textContent = "Please select whether you are a Customer or Supplier.";
            return;
        }

        // Simulate authentication (in a real app, send this data to the backend)
        if (isSignup) {
            const userData = {
                name: nameField.value,
                phone: phoneField.value,
                email: emailField.value,
                password: passwordField.value,
                role: selectedRole
            };
            localStorage.setItem(emailField.value, JSON.stringify(userData));
            alert("Signup successful! You can now log in.");
            isSignup = false;
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            toggleLink.textContent = "Don't have an account? Sign up";
            nameField.style.display = "none";
            phoneField.style.display = "none";
        } else {
            const storedUser = JSON.parse(localStorage.getItem(emailField.value));
            if (storedUser && storedUser.password === passwordField.value) {

                // Redirect based on role
                if (storedUser.role === "customer") {
                    window.location.href = "pages/customer_home.html";
                } else if (storedUser.role === "supplier") {
                    window.location.href = "pages/supplier_home.html";
                }
            } else {
                errorMessage.textContent = "Invalid email or password";
            }
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[6-9]\d{9}$/.test(phone);
    }
});
