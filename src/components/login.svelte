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
    Icon,
    LoginScreen,
  } from "framework7-svelte";
  import Framework7, { getDevice } from "framework7";

  export let loginScreenOpened = false;
  export let loginStats;
  const device = getDevice();
  let username = "";
  let password = "";

  function signIn() {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
      loginStats = true;
    });
  }

  var handleError = function (err) {
    console.warn(err);
  };

  const login = async (data) => {
    console.log(data)
    const request = new Request("http://localhost:5000/profile/login/google", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    console.log(msg);
  };

  function handleCredentialResponse(response) {
    login(response);
  }

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
    <Row>
      <Col width="15" />
      <Col width="5">
        <Button
          class="link login-screen-close close-button button"
          iconF7="xmark_circle_fill"
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
            label="Username"
            type="text"
            placeholder="Your username"
            value={username}
            onInput={(e) => (username = e.target.value)}
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onInput={(e) => (password = e.target.value)}
          />
        </List>
        <Button fill onClick={signIn}>Sign In</Button>
        <Button onClick={signIn}>Register</Button>
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
