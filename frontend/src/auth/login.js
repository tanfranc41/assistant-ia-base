const authState = {
  token: null,
};

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("status");
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  if (!username) {
    status.textContent = "Please enter a username";
    return;
  }

  authState.token = null;
  status.textContent = "Logging in...";

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`Login failed (${response.status})`);
    }

    const data = await response.json();
    const token = data?.token;
    if (!token) {
      throw new Error("Login failed (no token returned)");
    }
    authState.token = token;
    status.textContent = "Logged in";
  } catch (error) {
    status.textContent = error?.message || "Login failed";
  }
}

function wireForm() {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", handleSubmit);
}

function ready(callback) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

ready(wireForm);

export function getAuthToken() {
  return authState.token;
}
