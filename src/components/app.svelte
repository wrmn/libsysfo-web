<script>
  import { onMount } from "svelte";
  import { getDevice } from "framework7/lite-bundle";
  import {
    f7,
    f7ready,
    App,
    Panel,
    Button,
    View,
    Page,
    Navbar,
    NavRight,
    BlockTitle,
    List,
    ListItem,
  } from "framework7-svelte";
  import cordovaApp from "../js/cordova-app";

  import routes from "../js/routes";
  import store from "../js/store";

  import { darkTheme } from "../stores/theme";

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: "Library Information System", // App name
    theme: "auto", // Automatic theme detection

    id: "io.framework7.libsysfo", // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,
    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === "production"
        ? {
            path: "/service-worker.js",
          }
        : {},

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.cordova && !device.electron,
      scrollIntoViewCentered: device.cordova && !device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  onMount(() => {
    f7ready(() => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }

      // Call F7 APIs here
    });
  });
  if (localStorage.getItem("theme") === "dark") {
    darkTheme.set(true);
  }
</script>

<svelte:head>
  <script>
    try {
      const { matches: isDarkMode } = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const theme = localStorage.getItem("theme");
      const opposite = theme === "dark" ? "light" : "dark";
      document.documentElement.classList.add(theme);
      document.documentElement.classList.remove(opposite);
    } catch (err) {
      console.error(err);
    }
  </script>
</svelte:head>

<App {...f7params}>
  <!-- Left panel with cover effect when hidden -->

  <Panel left cover visibleBreakpoint={1280}>
    <View>
      <Page>
        <Navbar title="Menu">
          <NavRight>
            <Button
              on:click={() => {
                const theme = localStorage.getItem("theme");
                const opposite = theme === "dark" ? "light" : "dark";
                document.documentElement.classList.add(opposite);
                document.documentElement.classList.remove(theme);
                localStorage.setItem("theme", opposite);
                darkTheme.set(!$darkTheme);
              }}
            >
              <i id="well" class="icon f7-icons color-custom">
                {#if !$darkTheme}
                  sun_min
                {:else}
                  moon
                {/if}
              </i>
              <!-- moon -->
            </Button>
          </NavRight>
        </Navbar>
        <List>
          <ListItem link="/" view=".view-main" panelClose title="Home" />
          <ListItem link="/book/" view=".view-main" panelClose title="Book" />
          <ListItem
            link="/library/"
            view=".view-main"
            panelClose
            title="Library"
          />
        </List>
        <BlockTitle>Preferences</BlockTitle>
        <List>
          <ListItem
            link="/profile/"
            view=".view-main"
            panelClose
            title="Profile"
          />
          <ListItem
            link="/setting/"
            view=".view-main"
            panelClose
            title="Setting"
          />
        </List>
        <BlockTitle>Help</BlockTitle>
        <List>
          <ListItem link="/faq/" view=".view-main" panelClose title="FAQ" />
          <ListItem link="/contact/" view=".view-main" panelClose title="Contact" />
          <ListItem link="/about/" view=".view-main" panelClose title="About" />
        </List>
      </Page>
    </View>
  </Panel>

  <View main class="safe-areas" url="/" />
</App>
