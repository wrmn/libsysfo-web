<script>
  import { List, ListItem, AccordionContent } from "framework7-svelte";
  import { userResult } from "../../stores/data";
  import { onDestroy, onMount } from "svelte";

  import LoginRequired from "../../components/loginRequired.svelte";
  import UsernameSetting from "./setting/username.svelte";
  import PasswordSetting from "./setting/password.svelte";
  import EmailSetting from "./setting/email.svelte";
  import ProfileSetting from "./setting/profile.svelte";
  import ProfilePicture from "./setting/profilePicture.svelte";

  let email, username;

  var handleError = function (err) {
    console.warn(err);
  };

  onMount(() => {
    getData();
  });

  onDestroy(() => {
    userResult.set([]);
  });

  var handleError = function (err) {
    console.warn(err);
  };

  const getData = async () => {
    userResult.set([]);
    if (!localStorage.getItem("account-credential")) {
      return;
    }
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
    email = $userResult.email;
    username = $userResult.username;
  };
</script>

<LoginRequired title="Profile Setting">
  <span slot="content">
    <List accordionList accordionOpposite>
      <ListItem accordionItem title="Username">
        <AccordionContent>
          <UsernameSetting bind:username />
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Email">
        <AccordionContent>
          <EmailSetting bind:email />
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Password">
        <AccordionContent>
          <PasswordSetting />
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Profile Picture">
        <AccordionContent>
          <ProfilePicture />
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Profile Information">
        <AccordionContent>
          <ProfileSetting />
        </AccordionContent>
      </ListItem>
    </List>
  </span>
</LoginRequired>
