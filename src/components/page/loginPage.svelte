<script>
  import {
    f7,
    Row,
    Col,
    Page,
    LoginScreenTitle,
    List,
    ListInput,
    Button,
    LoginScreen,
  } from "framework7-svelte";
  import { getDevice } from "framework7";
  import Register from "./registerPage.svelte";
  import { loginStats, userResult } from "../../stores/data";

  export let loginScreenOpened = false;
  export let registerScreenOpened = false;
  const device = getDevice();
  let idValue = "";
  let pwd = "";

  const signIn = async () => {
    const data = {
      indicator: idValue,
      password: pwd,
    };
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/login`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Login Failed");
    } else {
      localStorage.setItem("account-credential", msg.data.token);
      loginStats.set(true);
      f7.loginScreen.close();
      getData();
    }
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const getData = async () => {
    userResult.set([]);
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    userResult.set(msg.data.profile);
  };

  const login = async (data) => {
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/login/google`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Login Failed");
    } else {
      localStorage.setItem("account-credential", msg.data.token);
      loginStats.set(true);
      f7.loginScreen.close();
      getData();
    }
  };

  const handleCredentialResponse = (response) => {
    login(response);
  };

  const initLogin = () => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "filled_black",
      size: "large",
      shape: "pill",
    });
  };
</script>

<svelte:head>
  <script
    src="https://accounts.google.com/gsi/client"
    async
    defer
    on:load={initLogin}></script>
</svelte:head>

<LoginScreen
  class="demo-login-screen"
  opened={loginScreenOpened}
  onLoginScreenClosed={() => (loginScreenOpened = false)}
>
  <Page loginScreen>
    <Register bind:registerScreenOpened />
    <Row>
      <Col width="15" />
      <Col width="5">
        <Button
          class="link login-screen-close close-button button"
          iconF7="xmark"
          iconSize="35px"
        />
      </Col>
      <Col width="80" />
    </Row>
    <Row>
      <Col width="100" medium="20" />
      <Col width="100" medium="30">
        <div class="image-container">
          <img src="./static/images/main-icon.png" alt="" height="200" />
        </div>
        <div class="main-image title">Library Information System</div>
      </Col>
      <Col width="100" medium="30">
        <LoginScreenTitle>Login</LoginScreenTitle>
        {#if !device.android}
          <h3>Login with</h3>
          <div id="buttonDiv" />
        {/if}
        <h3>Account login</h3>
        <List form>
          <ListInput
            label="Username Or Email"
            type="text"
            placeholder="Your username or email"
            value={idValue}
            onInput={(e) => (idValue = e.target.value)}
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Your password"
            value={pwd}
            onInput={(e) => (pwd = e.target.value)}
          />
        </List>
        <Button fill onClick={signIn}>Sign In</Button>
        <Button
          on:click={() => {
            registerScreenOpened = !registerScreenOpened;
            f7.loginScreen.close();
          }}>Register</Button
        >
      </Col>
      <Col width="100" medium="20" />
    </Row>
  </Page>
</LoginScreen>

<style>
  .main-image {
    margin: auto;
    font-family: "Alata", sans-serif;
    margin-bottom: 10%;
    max-width: 500px;
    font-size: 3em;
    font-weight: 500;
    justify-content: center;
    text-align: center;
  }

  .image-container {
    text-align: center;
  }
</style>
