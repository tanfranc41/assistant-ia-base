const authState = {
  token: null,
};
const USERNAME_MAX_LENGTH = 64;

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("status");
  status.setAttribute("aria-hidden", "false");
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  if (!username) {
    status.textContent = "Please enter a username";
    return;
  }
  if (username.length > USERNAME_MAX_LENGTH) {
    status.textContent = `Username must be ${USERNAME_MAX_LENGTH} characters or fewer`;
    return;
  }
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

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Login failed (invalid response)");
    }
    const token = data?.token;
    if (typeof token !== "string" || token.length === 0) {
      throw new Error("Login failed (no token returned)");
    }
    const segments = token.split(".");
    const base64Url = /^[A-Za-z0-9_-]+$/;
    const validJwt =
      segments.length === 3 &&
      segments.every((segment) => segment.length > 0 && base64Url.test(segment));
    if (!validJwt) {
      throw new Error("Login failed (invalid token format)");
    }
    authState.token = token;
    status.textContent = "Logged in";
  } catch (error) {
    status.textContent =
      typeof error?.message === "string" ? error.message : "Login failed";
  }
}

function wireForm() {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  if (usernameInput) {
    usernameInput.maxLength = USERNAME_MAX_LENGTH;
  }
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
