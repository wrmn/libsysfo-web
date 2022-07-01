export const checkLogin = () => {
  const loginStats = localStorage.getItem("account-credential") != null;
  return loginStats;
};

export const logout = () => {
  localStorage.removeItem("account-credential");
  
};

export const switchTheme = () => {
  const theme = localStorage.getItem("theme");
  const opposite = theme === "dark" ? "light" : "dark";
  document.documentElement.classList.add(opposite);
  document.documentElement.classList.remove(theme);
  localStorage.setItem("theme", opposite);
};
