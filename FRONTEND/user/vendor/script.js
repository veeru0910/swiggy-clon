// ---------------------------
// VENDOR LOGIN
// ---------------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/vendor/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Login Successful ✅");
                // window.location.href = "vendor-dashboard.html";
            } else {
                alert(data.message || "Login Failed ❌");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Cannot connect to backend ❌");
        }
    });
}


// ---------------------------
// VENDOR REGISTRATION
// ---------------------------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        try {
            const response = await fetch("/vendor/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Registration Successful ✅");
                window.location.href = "vendor-login.html";
            } else {
                alert(data.message || "Registration Failed ❌");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Cannot connect to backend ❌");
        }
    });
}
