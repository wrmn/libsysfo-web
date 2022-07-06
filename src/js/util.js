import { f7 } from "framework7-svelte";
import { loginStats, userResult } from "../stores/data";
import dateFormat from "dateformat";

export const checkLogin = () => {
  const loginStats = localStorage.getItem("account-credential") != null;
  return loginStats;
};

export const logout = () => {
  f7.dialog.confirm("Logout user?", "", function () {
    localStorage.removeItem("account-credential");
    userResult.set([]);
    loginStats.set(checkLogin());
    f7.dialog.alert("Logged Out", "Info");
  });
};

export const switchTheme = () => {
  const theme = localStorage.getItem("theme");
  const opposite = theme === "dark" ? "light" : "dark";
  document.documentElement.classList.add(opposite);
  document.documentElement.classList.remove(theme);
  localStorage.setItem("theme", opposite);
};

export const isoToDmy = (dateStr, format) => {
  const date = new Date(dateStr);
  return dateFormat(date, format);
};
