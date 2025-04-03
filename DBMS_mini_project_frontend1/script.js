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

    toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        isSignup = !isSignup;
        formTitle.textContent = isSignup ? "Sign Up" : "Login";
        submitBtn.textContent = isSignup ? "Sign Up" : "Login";
        toggleLink.textContent = isSignup ? "Already have an account? Login" : "Don't have an account? Sign up";
        nameField.style.display = isSignup ? "block" : "none";
        phoneField.style.display = isSignup ? "block" : "none";
    });

    try {
        const response = await fetch('http://127.0.0.1:5000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showMessage('Signup successful!', 'success');
        } else {
            showMessage(data.error || 'Signup failed!', 'error');
        }
    } catch (error) {
        showMessage('Error connecting to server!', 'error');
        console.error('❌ [Frontend] Signup error:', error);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        errorMessage.textContent = "";

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

        const userData = {
            email: emailField.value,
            password: passwordField.value,
            role: selectedRole
        };

        if (isSignup) {
            userData.name = nameField.value;
            userData.phone = phoneField.value;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/${isSignup ? 'signup' : 'login'}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                if (!isSignup) {
                    window.location.href = selectedRole === "customer" ? "pages/customer_home.html" : "pages/supplier_home.html";
                }
            } else {
                errorMessage.textContent = result.error;
            }
        } catch (error) {
            errorMessage.textContent = "Server error. Please try again later.";
        }
    });
});