<script>
  import Login from "../../components/login.svelte";
  import { Button, Page } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";

  let loginScreenOpened = false;
</script>

<Page>
  <StandardHeader title="profile" side />
  <Login bind:loginScreenOpened />
  <Button
    fill
    on:click={() => {
      loginScreenOpened = !loginScreenOpened;
    }}>Profile Information</Button
  >
</Page>
