<script>
    import {
      NavTitle,
      Navbar,
      NavRight,
      NavLeft,
      Link,
      Icon,
    } from "framework7-svelte";
    export let title;
    export let side = false;
  </script>
  
  <Navbar class="make-capital">
    <NavLeft>
      <Link
        iconIos="f7:menu"
        iconAurora="f7:menu"
        iconMd="material:menu"
        panelOpen="left"
      />
    </NavLeft>
    <NavTitle sliding>{title}</NavTitle>
  
    <NavRight>
      {#if !side}
        <Link href="/"><Icon f7="house_fill" /></Link>
      {/if}
    </NavRight>
  </Navbar>
  