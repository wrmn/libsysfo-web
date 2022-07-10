<script>
  import { List, ListItem, ListInput, Button, f7 } from "framework7-svelte";
  import {
    loginStats,
    userResult,
    permissionResult,
    borrowResult,
  } from "../../../stores/data";

  export let username;

  const getData = async () => {
    userResult.set([]);
    permissionResult.set([]);
    borrowResult.set([]);
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    userResult.set(msg.data.profile);
    if (msg.data.permission) {
      permissionResult.set(msg.data.permission);
    }
    if (msg.data.borrow) {
      borrowResult.set(msg.data.borrow);
    }
  };

  const chgUsername = async (password) => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    myHeaders.append("Account-auth", password);

    const reqBody = {
      newUsername: username,
    };

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/update/username`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Login Failed");
    } else {
      f7.dialog.alert(msg.description, "");
      localStorage.setItem("account-credential", msg.data.token);
      loginStats.set(true);
      f7.loginScreen.close();
      getData();
    }
  };

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };
</script>

<List>
  <ListInput
    label="Username"
    type="text"
    floatingLabel
    bind:value={username}
    placeholder="Your e-mail"
  >
    <i class="f7-icons" slot="media"> person</i>
  </ListInput>
  <ListItem>
    <Button disabled />
    <Button
      fill
      on:click={() => {
        f7.dialog.password("Enter your password", "", (password) => {
          chgUsername(password);
        });
      }}>Change Username</Button
    >
  </ListItem>
</List>
