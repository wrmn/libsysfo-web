<script>
  import { Navbar, NavRight, Link, Icon } from "framework7-svelte";
  export let title;
  export let side = false;
</script>

<Navbar {title} backLink="back" class="make-capital">
  <NavRight>
    {#if !side}
      <Link href="/"><Icon f7="house_fill" /></Link>
    {/if}
  </NavRight>
</Navbar>
