<script>
  import { Navbar, NavRight, Link, Icon } from "framework7-svelte";
  export let title;
</script>

<Navbar {title} backLink="back">
  <NavRight>
    <Link href="/"><Icon f7="house_fill" /></Link>
  </NavRight>
</Navbar>
