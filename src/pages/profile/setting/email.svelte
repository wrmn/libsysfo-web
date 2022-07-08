<script>
  import { List, ListItem, ListInput, Button, f7 } from "framework7-svelte";
  import {
    loginStats,
    userResult,
    permissionResult,
    borrowResult,
  } from "../../../stores/data";

  export let email;

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

  const resendMail = async () => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/validate/resend`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(request).catch(handleError);
    if (response.status != 200) {
      f7.dialog.alert("Fail to resend verification email", "");
      return;
    }
    const msg = await response.json();
    f7.dialog.alert(msg.description, "");
  };

  const chgEmail = async (password) => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    myHeaders.append("Account-auth", password);

    const reqBody = {
      newEmail: email,
    };

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/update/email`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Failed");
    } else {
      f7.dialog.alert(msg.description, "");
      localStorage.setItem("account-credential", msg.data.token);
      loginStats.set(true);
      f7.loginScreen.close();
      getData();
    }
  };

  var handleError = function (err) {
    console.warn(err);
  };
</script>

<List>
  <ListInput
    label="E-mail"
    type="email"
    disabled={$userResult.verivied}
    floatingLabel
    bind:value={email}
    info={$userResult.verivied ? "" : "Email not verivied yet"}
    placeholder="Your e-mail"
  >
    <i
      class={$userResult.verivied ? "f7-icons" : "icon demo-list-icon"}
      slot="media"
    >
      {#if $userResult.verivied}
        checkmark_shield
      {/if}
    </i>
  </ListInput>
  {#if !$userResult.verivied}
    <ListItem>
      <Button
        fill
        on:click={() => {
          f7.dialog.alert(`Resend email to ${$userResult.email} ?`, "", () => {
            resendMail();
          });
        }}>Resend Email Verivication</Button
      >
      <Button
        fill
        on:click={() => {
          f7.dialog.password("Enter your password", "", (password) => {
            chgEmail(password);
          });
        }}>Change Email</Button
      >
    </ListItem>
  {/if}
</List>
