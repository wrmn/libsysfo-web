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
  import {
    loginStats,
    userResult,
    permissionResult,
    borrowResult,
  } from "../../stores/data";

  export let registerScreenOpened = false;
  let email, username, name, password, retypePassword;

  const getData = async () => {
    userResult.set([]);
    permissionResult.set([]);
    borrowResult.set([]);
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
    if (msg.data.permission) {
      permissionResult.set(msg.data.permission);
    }
    if (msg.data.borrow) {
      borrowResult.set(msg.data.borrow);
    }
  };

  const register = async () => {
    if (!name || !username) {
      f7.dialog.alert("Please fill all field", "");
      return;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        email
      )
    ) {
      f7.dialog.alert("Invalid email", "");
      return;
    }
    if (password != retypePassword) {
      f7.dialog.alert("Incorrect Retype Password", "");
      return;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/g.test(password)) {
      f7.dialog.alert(
        "Password need have at least one capital letter, one small leter, one number and one symbol",
        ""
      );
      return;
    }

    const reqBody = {
      email,
      username,
      name,
      password,
      retypePassword,
    };
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/register`,
      {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Registration Failed");
    } else {
      localStorage.setItem("account-credential", msg.data.token);
      loginStats.set(true);
      f7.loginScreen.close();
      getData();
    }
  };

  const handleError = (err) => {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };
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
            bind:value={email}
          />

          <ListInput
            label="Name"
            type="text"
            placeholder="Your Name"
            bind:value={name}
          />
          <ListInput
            label="Username"
            type="text"
            placeholder="Your username"
            bind:value={username}
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Your Password"
            bind:value={password}
          />
          <ListInput
            label="Password"
            type="password"
            placeholder="Retype Your password"
            bind:value={retypePassword}
          />
        </List>
        <Button
          fill
          onClick={() => {
            register();
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
