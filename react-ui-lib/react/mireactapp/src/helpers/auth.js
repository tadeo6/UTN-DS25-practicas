export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function parseJWT(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function getUserData() {
  const token = getToken();
  return token ? parseJWT(token) : null;
}

export function isTokenExpired() {
  const userData = getUserData();
  if (!userData || !userData.exp) return true;
  return userData.exp * 1000 < Date.now();
}

export function isLoggedIn() {
  const token = getToken();
  return !!token && !isTokenExpired();
}

export function getUserRole() {
  const data = getUserData();
  return data?.role || null;
}
