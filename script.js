function toggleForms() {
    let loginContainer = document.getElementById("loginFormContainer");
    let signupContainer = document.getElementById("signupFormContainer");

    if (loginContainer.style.display === "none") {
        loginContainer.style.display = "block";
        signupContainer.style.display = "none";
    } else {
        loginContainer.style.display = "none";
        signupContainer.style.display = "block";
    }
}

// Login Function
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    let errorMsg = document.getElementById('error-msg');

    try {
        let response = await fetch('http://127.0.0.1:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        let data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "/pages/customer_home.html";
        } else {
            errorMsg.textContent = data.error;
        }
    } catch (error) {
        errorMsg.textContent = "Error connecting to server!";
    }
});

// Signup Function
async function signup() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const role = document.getElementById('role').value;

    if (!name || !email || !phone || !password || !role) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            toggleForms(); // Switch to login form
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
        alert("Error connecting to server!");
    }
}
