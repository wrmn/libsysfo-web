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
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter,
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
  // Login screen demo data
  let username = "";
  let password = "";

  function alertLoginData() {
    f7.dialog.alert(
      "Username: " + username + "<br>Password: " + password,
      () => {
        f7.loginScreen.close();
      }
    );
  }
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

  <Panel left reveal visibleBreakpoint={960}>
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
        <BlockTitle>Left View Navigation</BlockTitle>
        <List>
          <ListItem link="/left-page-1/" title="Left Page 1" />
          <ListItem link="/left-page-2/" title="Left Page 2" />
        </List>
        <BlockTitle>Control Main View</BlockTitle>
        <List>
          <ListItem link="/about/" view=".view-main" panelClose title="About" />
          <ListItem link="/form/" view=".view-main" panelClose title="Form" />
          <ListItem link="/map/" view=".view-main" panelClose title="Map" />
          <ListItem
            link="#"
            view=".view-main"
            back
            panelClose
            title="Back in history"
          />
        </List>
      </Page>
    </View>
  </Panel>

  <!-- Your main view, should have "view-main" class -->
  <View main class="safe-areas" url="/" />

  <!-- Popup -->
  <Popup id="my-popup">
    <View>
      <Page>
        <Navbar title="Popup">
          <NavRight>
            <Link popupClose>Close</Link>
          </NavRight>
        </Navbar>
        <Block>
          <p>Popup content goes here.</p>
        </Block>
      </Page>
    </View>
  </Popup>

  <LoginScreen id="my-login-screen">
    <View>
      <Page loginScreen>
        <LoginScreenTitle>Login</LoginScreenTitle>
        <List form>
          <ListInput
            type="text"
            name="username"
            placeholder="Your username"
            bind:value={username}
          />
          <ListInput
            type="password"
            name="password"
            placeholder="Your password"
            bind:value={password}
          />
        </List>
        <List>
          <ListButton title="Sign In" onClick={() => alertLoginData()} />
        </List>
        <BlockFooter>
          Some text about login information.<br />Click "Sign In" to close Login
          Screen
        </BlockFooter>
      </Page>
    </View>
  </LoginScreen>
</App>
