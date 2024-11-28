function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  fetch("http://127.0.0.1:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      return response.json();
    })
    .then((data) => {
      const token = data.access_token;
      localStorage.setItem("jwt", token);
      document.body.classList.add('authenticated');
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erreur :", error);
      alert("Invalid credentials. Please try again.");
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});
