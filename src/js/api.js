import { notification, notificationCount } from "./store";
import { f7 } from "framework7-svelte";
import { get } from "svelte/store";
const serverUrl = import.meta.env.VITE_SERVER_ADDRESS;

export const getNotification = async () => {
  notification.set(await getWithAuth(`/notification`));
  setTimeout(() => {
    let res = get(notification);
    if ("data" in res && res.data.notification) {
      console.log("masuk");
      let count = 0;
      res.data.notification.forEach((e) => {
        if (e.read == false) {
          count++;
        }
      });
      notificationCount.set(count);
    }
  }, 2000);
};

export const readNotification = async () => {
  const resp = await postWithAuth(undefined, `/notification`);
  f7.dialog.alert(resp.description ? resp.description : "server timeout", "");
  if (resp == 200) {
    notificationCount.set(0);
  }
};

const getWithAuth = async (path) => {
  const myHeaders = new Headers();
  if (localStorage.getItem("account-credential")) {
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );
    const request = new Request(`${serverUrl}${path}`, {
      method: "GET",
      headers: myHeaders,
    });
    const response = await fetch(request).catch(handleError);
    return response.json();
  }
  return {};
};

const postWithAuth = async (data, path, password) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("account-credential")}`
  );

  if (password != undefined) {
    myHeaders.append("Account-auth", password);
  }

  const request = new Request(`${serverUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: myHeaders,
  });
  const response = await fetch(request).catch(handleError);
  return response.json();
};

const handleError = (err) => {
  console.warn(err);
  f7.dialog.close();
  f7.dialog.alert("server timeout", "");
};
