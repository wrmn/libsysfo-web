<script>
    import { Button } from "framework7-svelte";
    import LoginRequired from "../../components/loginRequired.svelte";
    import { logout } from "../../js/util";
  </script>
  
  <LoginRequired title="settings">
    <span slot="content">
      logged in
      <Button
        fill
        on:click={() => {
          logout();
        }}>Logout</Button
      >
    </span>
  </LoginRequired>
  