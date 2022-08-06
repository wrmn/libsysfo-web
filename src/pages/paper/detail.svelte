<script>
  import {
    Page,
    f7,
    Toolbar,
    Link,
    Tabs,
    Card,
    CardContent,
    Button,
    Badge,
    Tab,
    Row,
    Preloader,
  } from "framework7-svelte";
  import { onMount, onDestroy } from "svelte";
  import MainCard from "../../components/card/mainCard.svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { loginStats, paperResult } from "../../stores/data";

  export let f7route;
  export let f7router;

  onMount(() => {
    getData(f7route.params["paperId"]);
  });

  onDestroy(() => {
    paperResult.set([]);
  });

  var handleError = function (err) {
    paperResult.set("error");
    console.warn(err);
    f7.dialog.alert("Detail Jurnal Tidak Tersedia", "", () => {
      f7router.back();
    });
  };

  const getData = async (id) => {
    paperResult.set([]);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/paper/${id}`
    ).catch(handleError);
    const msg = await response.json();
    let desc = "";
    const ekey = Object.keys(msg.data.paper.description);
    const evalue = Object.values(msg.data.paper.description);
    ekey.forEach((f, i) => {
      desc = `${desc}${ekey[i]} : ${evalue[i]}<br>`;
    });
    msg.data.paper.information = desc;
    msg.data.paper.image =
      "https://pict.sindonews.net/dyn/620/pena/news/2020/12/05/207/257920/beberapa-cara-mudah-untuk-mengonversi-file-ke-pdf-jxi.jpg";
    paperResult.set(msg.data);
  };

  const permissionRequest = async (requestPurpose) => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );
    const reqBody = {
      paperId: $paperResult.paper.id,
      requestPurpose,
    };

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/permission/new`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();

    if (response.status != 200) {
      f7.dialog.alert(msg.description, "Task Failed!");
      return;
    }
    f7.dialog.alert(msg.description, "", () => {
      f7.views.main.router.navigate("/paper/access/");
    });
  };
</script>

<Page>
  {#if $paperResult.length == 0}
    <StandardHeader title="Loading..." />
    <Row>
      <div class="make-center">
        <Preloader color="multi" />
      </div>
    </Row>
  {:else if $paperResult == "error"}
    <StandardHeader title="Not Found" />
  {:else}
    <StandardHeader title={$paperResult.paper.title} />

    <MainCard
      mainImage={$paperResult.paper.image
        ? $paperResult.paper.image
        : "https://dummyimage.com/600x400/ababab/0011ff"}
    >
      <span slot="name">
        {#if $paperResult.paper.access}
          <Badge color="green">Accessible</Badge>
        {:else}
          <Badge color="red">Not Accessible</Badge>
        {/if}<br />{$paperResult.paper.title}</span
      >
      <span slot="details">
        <h3 class="text-align-center make-capital">
          {$paperResult.paper.type}
        </h3>
        {#each $paperResult.paper.subject as subj, i}
          {#if i != $paperResult.paper.subject.length - 1}
            {` ${subj}`}
            {#if i != $paperResult.paper.subject.length - 2}
              ,
            {/if}
          {:else}
            {` & ${subj}`}
          {/if}
        {/each}<br />
        {@html $paperResult.paper.information}
        {#if $paperResult.paper.access && $loginStats}
          <Button
            fill
            on:click={() => {
              f7.dialog.prompt(
                "what is your purpose for accessing this document?",
                "",
                (purpose) => {
                  permissionRequest(purpose);
                }
              );
            }}>Request Access</Button
          >
        {/if}
      </span>
      <span slot="action">
        <Toolbar tabbar bottom>
          <Link tabLink="#tab-abstract" tabLinkActive>Abstract</Link>
          <Link tabLink="#tab-library">Library</Link>
        </Toolbar>
        <Tabs>
          <Tab id="tab-abstract" tabActive>
            <Card class="demo-card-header-pic">
              <CardContent>
                <div class="text-align-justify">
                  {$paperResult.paper.abstract}
                </div>
              </CardContent>
            </Card>
          </Tab>
          <Tab id="tab-library">
            <Card class="demo-card-header-pic">
              <CardContent>
                <div class="text-align-justify">
                  <table width="100%" class=" make-capital">
                    <tr>
                      <td>name</td>
                      <td>
                        <Link
                          href={`/library/detail/${$paperResult.library.id}/`}
                        >
                          {$paperResult.library.name}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>{$paperResult.library.address}</td>
                    </tr>
                  </table>
                </div>
              </CardContent>
            </Card>
          </Tab>
        </Tabs>
      </span>
    </MainCard>
  {/if}
</Page>
