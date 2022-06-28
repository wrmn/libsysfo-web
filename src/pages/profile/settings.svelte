<script>
  import Login from "../../components/login.svelte";
  import { Button, Page } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { checkLogin } from "../../js/util";
  import { onMount } from "svelte";

  let loginScreenOpened = false;
  let loginStats = checkLogin();

  onMount(() => {
    loginScreenOpened = !loginStats;
  });
</script>

<Page>
  <StandardHeader title="settings" side />
  <Login bind:loginScreenOpened bind:loginStats/>
  {#if loginStats}
    logged in
  {:else}
    <Button
      fill
      on:click={() => {
        loginScreenOpened = !loginScreenOpened;
      }}>something</Button
    >
  {/if}
</Page>
