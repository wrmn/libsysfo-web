<script>
    import { Button } from "framework7-svelte";
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
          loginStats.set(false);
        }}>Logout</Button
      >
    </span>
  </LoginRequired>
  