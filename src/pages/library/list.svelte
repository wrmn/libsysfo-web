<script>
  import {
    Page,
    Navbar,
    List,
    ListInput,
    Row,
    Preloader,
    Icon,
    Col,
  } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import ContentCard from "../../components/contentCard.svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { dataResult, geoData } from "../../stores/data";

  let displayData = [];
  let something = "";
  let latitude, longitude;

  onMount(() => {
    dataSample();
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  });

  onDestroy(() => {
    dataResult.set([]);
    displayData = [];
  });

  var handleError = function (err) {
    console.warn(err);
    dataResult.set(err.message);

    return new Response(
      JSON.stringify({
        code: 400,
        message: "Stupid network Error",
      })
    );
  };

  const dataSample = async () => {
    const response = await fetch(
      "https://young-castle-31877.herokuapp.com/library"
    ).catch(handleError);
    const msg = await response.json();

    // dataResult.set(JSON.stringify(msg));
    msg.data.forEach((e) => {
      displayData.push({
        header: "lihat perpustakaan",
        address: e.address,
        image: e.images.main,
        coordinate: e.coordinate,
        content: e.name,
        path: `/library/${e.id}/`,
      });
    });

    dataResult.set(displayData);
  };

  function locationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    geoData.set([longitude, latitude]);
  }

  function locationError(error) {
    const message = error.message;
    latitude = message;
  }

  function nice() {
    console.log(something);
  }
</script>

<Page name="home">
  <StandardHeader title="Library List" />
  {$geoData}
  <div class="searchbar-container make-center">
    <List noHairlinesMd>
      <ListInput
        type="text"
        placeholder="Your name"
        clearButton
        bind:value={something}
        on:change={nice}
      >
        <Icon f7="search" slot="media" />
      </ListInput>
    </List>
  </div>
  <Row class="search-list searchbar-found">
    {#if typeof $dataResult == "object"}
      {#if $dataResult.length == 0}
        <div class="make-center">
          <Preloader color="multi" />
        </div>
      {/if}
      {#each $dataResult as sample}
        <Col width="100" medium="50">
          <ContentCard data={sample} position={$geoData} />
        </Col>
      {/each}
    {:else}
      {$dataResult}
    {/if}
  </Row>
</Page>

<style>
  .searchbar-container {
    width: 50%;
  }
</style>
