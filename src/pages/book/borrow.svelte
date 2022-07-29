<script>
  import { Button, f7 } from "framework7-svelte";
  import LoginRequired from "../../components/loginRequired.svelte";

  import BorrowPage from "../../components/page/borrowPage.svelte";
  import { borrowResult } from "../../stores/data";
  import { onDestroy, onMount } from "svelte";

  onMount(() => {
    getData();
  });

  onDestroy(() => {
    borrowResult.set([]);
  });

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };

  const getData = async () => {
    borrowResult.set([]);
    if (!localStorage.getItem("account-credential")) {
      return;
    }
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );
    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/borrow`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    console.log(msg);
    if (msg.data.borrow) {
      borrowResult.set(msg.data.borrow);
    }
  };
</script>

<LoginRequired title="My Book Borrow">
  <span slot="content">
    <BorrowPage />
  </span>
</LoginRequired>
