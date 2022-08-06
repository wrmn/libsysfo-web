<script>
  import {
    Card,
    CardContent,
    Row,
    Badge,
    Icon,
    Col,
    Toolbar,
    f7,
    Link,
    Tabs,
    Tab,
  } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import {
    permissionResult,
    userResult,
    borrowResult,
  } from "../../stores/data";
  import { isoToDmy, logout } from "../../js/util";

  import AccessPage from "../../components/page/accessPage.svelte";
  import BorrowPage from "../../components/page/borrowPage.svelte";
  import LoginRequired from "../../components/loginRequired.svelte";

  onMount(() => {
    getData();
  });

  onDestroy(() => {
    userResult.set([]);
    permissionResult.set([]);
    borrowResult.set([]);
  });

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
    if (msg.status == 200) {
      userResult.set(msg.data.profile);
      if (msg.data.permission) {
        permissionResult.set(msg.data.permission);
      }
      if (msg.data.borrow) {
        borrowResult.set(msg.data.borrow);
      }
    } else {
      f7.dialog.alert(msg.description, "logging out user", () => {
        localStorage.removeItem("account-credential");
        window.location.reload();
      });
    }
  };

  var handleError = function (err) {
    console.warn(err);
    f7.dialog.alert(err, "Server timeout");
  };
</script>

<LoginRequired title="Profile">
  <span slot="content">
    <div class="page-centered">
      <Card>
        <CardContent padding={false}>
          <div class="content-centered">
            <Row>
              <Col width="100" medium="25">
                <img src={$userResult.images} alt="" width="100" height="100" />
              </Col>
              <Col width="100" medium="75">
                <div class=" make-capital content-title">
                  {$userResult.name}
                </div>
                <div class="content-subtitle">
                  {$userResult.email}
                  {#if $userResult.verivied}
                    <Badge tooltip="Email verivied" color="blue">
                      <Icon f7="checkmark_shield" />
                    </Badge>
                  {/if}
                </div>
              </Col>
            </Row>
          </div>

          <Toolbar tabbar bottom>
            <Link tabLink="#tab-information" tabLinkActive>Information</Link>
            <Link tabLink="#tab-borrow">Borrow</Link>
            <Link tabLink="#tab-access">Access</Link>
          </Toolbar>
          <Tabs>
            <Tab id="tab-information" tabActive>
              <Card class="demo-card-header-pic">
                <CardContent>
                  {#if $userResult.dateOfBirth}
                    <table width="100%" class="make-capital">
                      <tbody>
                        <tr>
                          <td class="label-cell">Userame </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell" style="text-transform: none;">
                            {#if $userResult.username}
                              {$userResult.username}
                            {:else}
                              <a href="/profile/settings/"> Set username</a>
                            {/if}
                          </td>
                        </tr>
                        <tr>
                          <td class="label-cell">Name </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell"> {$userResult.name}</td>
                        </tr>
                        <tr>
                          <td class="label-cell">Gender </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell">
                            {$userResult.gender == "M"
                              ? "Male"
                              : $userResult.gender == "F"
                              ? "Female"
                              : "-"}
                          </td>
                        </tr>
                        <tr>
                          <td class="label-cell">Place/Date of birth </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell">
                            {$userResult.placeOfBirth} / {$userResult.dateOfBirth
                              ? isoToDmy(
                                  $userResult.dateOfBirth,
                                  "dd mmmm yyyy"
                                )
                              : "-"}
                          </td>
                        </tr>
                        <tr>
                          <td class="label-cell">Profession / Institution </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell">
                            {$userResult.profession}/{$userResult.institution}
                          </td>
                        </tr>
                        <tr>
                          <td class="label-cell">Address </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell">
                            {$userResult.address}
                          </td>
                        </tr>

                        <tr>
                          <td class="label-cell">Phone number </td>
                          <td class="label-cell">:</td>
                          <td class="label-cell">
                            {#if $userResult.isWhatsapp}
                              <Badge tooltip="Whatsapp Number" color="green"
                                ><Icon f7="phone_circle" /></Badge
                              >
                            {/if}
                            {`(${$userResult.phoneCode})${$userResult.phoneNo}`}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  {:else}
                    Lengkapi profil anda
                  {/if}
                </CardContent>
              </Card>
            </Tab>
            <Tab id="tab-borrow">
              <BorrowPage />
            </Tab>
            <Tab id="tab-access">
              <AccessPage />
            </Tab>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </span>
</LoginRequired>

<style>
  .page-centered {
    margin: 5% 10%;
  }

  .content-centered {
    padding: 50px;
  }

  .content-title {
    font-size: 2.2em;
    font-weight: bolder;
  }

  .content-subtitle {
    font-size: 1.3em;
    font-weight: bolder;
    opacity: 0.7;
  }
</style>
