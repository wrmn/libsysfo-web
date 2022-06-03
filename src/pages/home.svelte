<script>
  import Dom7 from "dom7";

  import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    View,
    Views,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
  } from "framework7-svelte";
</script>

<Page name="home">
  <!-- Top Navbar -->
  <Navbar sliding={false}>
    <NavLeft>
      <Link
        iconIos="f7:menu"
        iconAurora="f7:menu"
        iconMd="material:menu"
        panelOpen="left"
      />
    </NavLeft>
    <NavTitle sliding>Library Information System</NavTitle>
  </Navbar>
  <Views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <Toolbar tabbar labels top>
      <Link
        tabLink="#view-map"
        tabLinkActive
        iconIos="f7:house_fill"
        iconAurora="f7:house_fill"
        iconMd="material:home"
        text="Map"
      />
      <Link
        tabLink="#view-form"
        iconIos="f7:square_list_fill"
        iconAurora="f7:square_list_fill"
        iconMd="material:view_list"
        text="Form"
      />
      <Link
        tabLink="#view-about"
        iconIos="f7:gear"
        iconAurora="f7:gear"
        iconMd="material:settings"
        text="Settings"
      />
    </Toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tabActive" prop -->
    <View id="view-map" main tab tabActive url="/map/" />

    <!-- Catalog View -->
    <View id="view-form" name="form" tab url="/form/" />

    <!-- Settings View -->
    <View id="view-about" name="about" tab url="/about/" />
  </Views>
  <!-- Page content -->
 
</Page>
