const ADMIN_KEY = "menorah_admin_authenticated";

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === "true";
};

export const setAdminAuthenticated = (status: boolean): void => {
  if (status) {
    localStorage.setItem(ADMIN_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
};

export const validateAdminCredentials = (username: string, pass: string): boolean => {
  return username.trim().toLowerCase() === "admin" && pass === "admin123";
};
