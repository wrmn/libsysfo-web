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
    Icon,
    Badge,
    Tab,
    Row,
    Preloader,
  } from "framework7-svelte";
  import { onMount, onDestroy } from "svelte";
  import MainCard from "../../components/card/mainCard.svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { paperResult } from "../../stores/data";

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
      <span slot="name"> {$paperResult.paper.title}</span>
      <span slot="details">
        <h5 class="text-align-center make-capital">
          {$paperResult.paper.issn}
        </h5>
        <h3 class="text-align-center make-capital">
          {#each $paperResult.paper.subject as subj, i}
            {#if i != $paperResult.paper.subject.length - 1}
              {` ${subj}`}
              {#if i != $paperResult.paper.subject.length - 2}
                ,
              {/if}
            {:else}
              {` & ${subj}`}
            {/if}
          {/each}
        </h3>
        {@html $paperResult.paper.information}
      </span>
      <span slot="action">
        <Toolbar tabbar bottom>
          <Link tabLink="#tab-1" tabLinkActive>Abstract</Link>
          <Link tabLink="#tab-2">Library</Link>
        </Toolbar>
        <Tabs>
          <Tab id="tab-1" tabActive>
            <Card class="demo-card-header-pic">
              <CardContent>
                <div class="text-align-justify">
                  {$paperResult.paper.abstract}
                </div>
              </CardContent>
            </Card>
          </Tab>
          <Tab id="tab-2">
            <Card class="demo-card-header-pic">
              <CardContent>
                <div class="text-align-justify">
                  <table width="100%" class=" make-capital">
                    <tr>
                      <td>name</td>
                      <td>
                        <Link href={`/library/detail/${$paperResult.library.id}/`}>
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
