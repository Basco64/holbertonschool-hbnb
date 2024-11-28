export function checkAuthentication() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return false;
  }
  return true;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function checkAuthStatus() {
  const token = localStorage.getItem("jwt");

  if (token) {
    document.body.classList.add("authenticated");
  } else {
    document.body.classList.remove("authenticated");
  }
}

export function getUserId() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("User is not authenticated.");
    return null;
  }

  return fetch("http://127.0.0.1:5000/api/v1/auth/protected", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      return response.json();
    })
    .then((data) => {
      return data.id;
    })
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
}
