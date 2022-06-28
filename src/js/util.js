export const checkLogin = () => {
  const loginStats = localStorage.getItem("loginStats");
  return loginStats == true;
};
