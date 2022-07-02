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
  import { loginStats } from "../../stores/data";

  export let registerScreenOpened = false;
  let username = "";
  let password = "";

  function signIn() {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
      loginStats.set(true);
    });
  }
</script>

<LoginScreen
  class="demo-login-screen"
  opened={registerScreenOpened}
  onLoginScreenClosed={() => (registerScreenOpened = false)}
>
  <Page loginScreen>
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
        <LoginScreenTitle>Register</LoginScreenTitle>
        <h3>Account login</h3>
        <List form>
          <ListInput
            label="Email"
            type="email"
            placeholder="Your email"
            value={username}
            onInput={(e) => (username = e.target.value)}
          />

          <ListInput
            label="Name"
            type="text"
            placeholder="Your Name"
            value={username}
            onInput={(e) => (username = e.target.value)}
          />
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
            placeholder="Your Password"
            value={username}
            onInput={(e) => (username = e.target.value)}
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Retype Your password"
            value={password}
            onInput={(e) => (password = e.target.value)}
          />
        </List>
        <Button fill onClick={signIn}>Register</Button>
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
