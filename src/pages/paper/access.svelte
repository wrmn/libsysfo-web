<script>
  import { Button, f7 } from "framework7-svelte";
  import LoginRequired from "../../components/loginRequired.svelte";
  import AccessPage from "../../components/page/accessPage.svelte";
  import { permissionResult } from "../../stores/data";
  import { onDestroy, onMount } from "svelte";

  onMount(() => {
    getData();
  });

  onDestroy(() => {
    permissionResult.set([]);
  });

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };

  const getData = async () => {
    permissionResult.set([]);
    if (!localStorage.getItem("account-credential")) {
      return;
    }
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/permission`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.data.permission) {
      permissionResult.set(msg.data.permission);
    }
  };
</script>

<LoginRequired title="My Access">
  <span slot="content">
    <AccessPage />
  </span>
</LoginRequired>
