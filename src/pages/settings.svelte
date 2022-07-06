<script>
  import {
    Button,
    Page,
    BlockTitle,
    List,
    ListItem,
    Toggle,
  } from "framework7-svelte";
  import StandardHeader from "../components/standardHeader.svelte";
  import Login from "../components/page/loginPage.svelte";
  import { loginStats } from "../stores/data";
  import { darkTheme } from "../stores/main";
  import { logout, checkLogin, switchTheme } from "../js/util";
  import { onMount } from "svelte";

  let loginScreenOpened = false;
  let title = "setting";

  onMount(() => {
    loginStats.set(checkLogin());
  });
</script>

<Page>
  <StandardHeader bind:title side />
  <Login bind:loginScreenOpened />
  <BlockTitle>App</BlockTitle>
  <List simpleList>
    <ListItem>
      <span>Dark Mode</span>
      <Toggle
        checked={$darkTheme}
        onToggleChange={() => {
          switchTheme();
          darkTheme.set(!$darkTheme);
        }}
      />
    </ListItem>
  </List>
  <BlockTitle>Profile</BlockTitle>
  <List simpleList>
    {#if $loginStats}
      <span />

      <Button href="/profile/settings/" view=".view-main" panelClose
        >Setting</Button
      >
      <Button
        fill
        on:click={() => {
          logout();
        }}>Logout</Button
      >
    {:else}
      <Button
        fill
        on:click={() => {
          loginScreenOpened = !loginScreenOpened;
        }}>Login</Button
      >
    {/if}
  </List>
</Page>
