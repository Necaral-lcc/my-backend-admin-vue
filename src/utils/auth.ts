const { VITE_APP_TOKEN_KEY } = import.meta.env;

export function getToken() {
  return localStorage.getItem(VITE_APP_TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(VITE_APP_TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(VITE_APP_TOKEN_KEY);
}
export function isLogin() {
  return !!getToken();
}
