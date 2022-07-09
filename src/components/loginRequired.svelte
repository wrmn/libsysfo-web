<script>
  import Login from "./page/loginPage.svelte";
  import { Button, Page } from "framework7-svelte";
  import StandardHeader from "./standardHeader.svelte";
  import IndexHeader from "./indexHeader.svelte";
  import { checkLogin } from "../js/util";
  import { onMount } from "svelte";
  import { loginStats } from "../stores/data";

  let loginScreenOpened = false;
  export let title;

  onMount(() => {
    setTimeout(function () {
      loginStats.set(checkLogin());
      loginScreenOpened = !$loginStats;
    }, 50);
  });
</script>

<Page>
  <IndexHeader bind:title />
  <Login bind:loginScreenOpened />
  {#if $loginStats}
    <slot name="content" />
  {:else}
    <h3>Harap Login Untuk Mengakses Halaman Ini</h3>
    <Button
      fill
      on:click={() => {
        loginScreenOpened = !loginScreenOpened;
      }}
    >
      Login
    </Button>
  {/if}
</Page>
