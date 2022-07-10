<script>
  import { f7, List, ListInput, Icon, Button } from "framework7-svelte";
  let pwd, retypePwd, oldPwd;

  const chgpwd = async () => {
    if (pwd != retypePwd) {
      f7.dialog.alert("Incorrect Retype Password", "");
      return;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}/g.test(pwd)) {
      f7.dialog.alert(
        "New password need have at least one capital letter, one small leter, one number and one symbol",
        ""
      );
      return;
    }

    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    const reqBody = {
      oldPassword: oldPwd,
      password: pwd,
      retypePassword: retypePwd,
    };

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/update/password`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      }
    );
    const response = await fetch(request).catch(handleError);
    if (response.status != 200) {
      f7.dialog.alert("Incorrect Old Password", "");
      return;
    }
    const msg = await response.json();
    f7.dialog.alert(msg.description, "");
    pwd = retypePwd = oldPwd = "";
  };

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };
</script>

<List noHairlinesMd>
  <ListInput
    label="Password"
    floatingLabel
    type="password"
    placeholder="Your password"
    bind:value={oldPwd}
    clearButton
  >
    <Icon f7="lock_shield_fill" slot="media" />
  </ListInput>
  <ListInput
    label="New Password"
    bind:value={pwd}
    floatingLabel
    type="password"
    placeholder="Your new password"
    clearButton
  >
    <Icon f7="lock_shield_fill" slot="media" />
  </ListInput>
  <ListInput
    label="Retype Password"
    floatingLabel
    type="password"
    bind:value={retypePwd}
    placeholder="Retype your password"
    clearButton
    errorMessage="Password doesn't match"
  >
    <Icon f7="lock_shield_fill" slot="media" />
  </ListInput>
  <Button
    fill
    on:click={() => {
      chgpwd();
    }}>Save</Button
  >
</List>
