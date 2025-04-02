document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("auth-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
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
    });

    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorMessage.textContent = "";

        if (!validateEmail(email.value)) {
            errorMessage.textContent = "Invalid email format";
            return;
        }
        if (password.value.length < 6) {
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
            localStorage.setItem(email.value, JSON.stringify({ password: password.value, role: selectedRole }));
            alert("Signup successful! You can now log in.");
            isSignup = false;
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            toggleLink.textContent = "Don't have an account? Sign up";
        } else {
            const storedUser = JSON.parse(localStorage.getItem(email.value));
            if (storedUser && storedUser.password === password.value) {

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
});


