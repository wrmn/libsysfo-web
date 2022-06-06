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

  import { darkTheme, mainMenu } from "../stores/main";

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

  const switchTheme = () => {
    const theme = localStorage.getItem("theme");
    const opposite = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.add(opposite);
    document.documentElement.classList.remove(theme);
    localStorage.setItem("theme", opposite);
    darkTheme.set(!$darkTheme);
  };
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
  <Panel left cover visibleBreakpoint={1280}>
    <View>
      <Page>
        <Navbar title="Menu">
          <NavRight>
            <Button on:click={switchTheme}>
              <i class="icon f7-icons color-custom">
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
        {#each $mainMenu as child}
          {#if !child.main}
            <BlockTitle>{child.name}</BlockTitle>
          {/if}
          <List>
            {#each child.menus as menu}
              <ListItem
                link={menu.link}
                view={menu.view}
                panelClose={menu.panelClose}
                title={menu.name}
              />
            {/each}
          </List>
        {/each}
      </Page>
    </View>
  </Panel>

  <View main class="safe-areas" url="/" />
</App>
