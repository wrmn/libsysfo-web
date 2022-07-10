<script>
  import { List, Button, f7 } from "framework7-svelte";
  import { userResult, loginStats } from "../../../stores/data";
  let input;
  let container;
  let image;
  let placeholder;
  let files;
  let showImage = false;

  function onChange() {
    const file = input.files[0];

    if (file) {
      showImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        files = reader.result.split(",")[1];
        image.setAttribute("src", reader.result);
        f7.dialog.password("Enter your password", "", (password) => {
          chgPicture(password);
        });
      });
      reader.readAsDataURL(file);

      return;
    }

    showImage = false;
  }

  const chgPicture = async (password) => {
    f7.dialog.preloader();
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    myHeaders.append("Account-auth", password);

    const reqBody = {
      newPicture: files,
    };

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/update/picture`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.close();
      f7.dialog.alert(msg.description, "Failed");
    } else {
      f7.dialog.close();
      f7.dialog.alert(msg.description, "");
    }
  };

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };
</script>

<List>
  <div bind:this={container} class="text-align-center">
    {#if showImage}
      <img bind:this={image} src="" alt="Preview" width="200" height="200" />
    {:else}
      <img src={$userResult.images} alt="Preview" width="200" height="200" />
    {/if}
  </div>
  <div class="parent-div text-align-center">
    <button class="button button-fill">Change Profile Picture</button>
    <input
      bind:this={input}
      on:change={onChange}
      type="file"
      bind:value={files}
      accept="image/*"
    />
  </div>
</List>

<style>
  .parent-div {
    position: relative;
    overflow: hidden;
  }
  .parent-div input[type="file"] {
    left: 0;
    top: 0;
    opacity: 0;
    position: absolute;
    font-size: 90px;
  }
</style>
