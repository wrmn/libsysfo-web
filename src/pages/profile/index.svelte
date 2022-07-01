<script>
  import { Button, f7 } from "framework7-svelte";
  import LoginRequired from "../../components/loginRequired.svelte";
  import { loginStats } from "../../stores/data";
  import { logout } from "../../js/util";
</script>

<LoginRequired title="settings">
  <span slot="content">
    logged in
    <Button
      fill
      on:click={() => {
        logout();
        f7.dialog.alert("Logged Out", "Info");
        loginStats.set(false);
      }}>Logout</Button
    >
  </span>
</LoginRequired>
