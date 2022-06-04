<script>
  import { Page, Link, Toolbar, View, Views } from "framework7-svelte";
  import { menus } from "../../stores/library";
</script>

<Page name="home" hideToolbarOnScroll>
  <Views tabs class="safe-areas">
    <Toolbar tabbar labels top>
      {#each $menus as menu}
        <Link
          tabLink={`#${menu.tablink}`}
          iconIos={`f7:${menu.icon}`}
          iconAurora={`f7:${menu.icon}`}
          tabLinkActive={menu.active}
          iconMd={`material:${menu.iconMd}`}
          text={menu.text}
        />
      {/each}
    </Toolbar>

    {#each $menus as menu}
      <View
        id={menu.tablink}
        main={menu.active}
        tab
        tabActive={menu.active}
        url={menu.url}
      />
    {/each}
  </Views>
</Page>
