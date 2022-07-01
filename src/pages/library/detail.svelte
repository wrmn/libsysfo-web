<script>
  import {
    Page,
    Preloader,
    Toolbar,
    Link,
    Block,
    Tabs,
    Tab,
    Row,
  } from "framework7-svelte";

  import StandardHeader from "../../components/standardHeader.svelte";
  import Gallery from "./detail/gallery.svelte";
  import Info from "./detail/info.svelte";
  import Direction from "./detail/_Direction.svelte";

  import { onDestroy, onMount } from "svelte";
  import { Map } from "@beyonk/svelte-mapbox";
  import { libraryResult } from "../../stores/data";

  export let f7route;

  const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;
  let mapComponent;
  let zoom = 11.5;
  let loc = {
    src: [0, 0],
    dst: [0, 0],
  };
  let center = { lat: -0.9345808, lng: 100.37 };

  onMount(() => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    dataSample(f7route.params["libraryId"]);
  });

  onDestroy(() => {
    libraryResult.set([]);
  });

  function locationSuccess(position) {
    loc.src = [position.coords.longitude, position.coords.latitude];
  }

  function locationError(error) {
    const message = error.message;
    alert(message);
  }

  var handleError = function (err) {
    console.warn(err);
  };

  const dataSample = async (id) => {
    const response = await fetch(`http://localhost:5000/library/${id}`).catch(
      handleError
    );
    const msg = await response.json();
    libraryResult.set(msg.data.library);
    loc.dst = msg.data.library.coordinate;
    mapComponent.setCenter(loc.dst);
    zoom = 15;
  };

  function resizes() {
    mapComponent.resize();
  }

  async function getDirection(meth) {
    // NOTE: change this line for custom location
    // loc.src = [80.46084726822548, -0.915438492909816];

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${meth}/${loc.src[0]},${loc.src[1]};${loc.dst[0]},${loc.dst[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`,
      { method: "GET" }
    ).catch(handleError);

    if (query.status != 200) {
      return false;
    }
    return await query.json();
  }
</script>

<Page>
  {#if $libraryResult.length == 0}
    <StandardHeader title="Loading..." />
    <Row>
      <div class="make-center">
        <Preloader color="multi" />
      </div>
    </Row>
  {:else}
    <StandardHeader title={$libraryResult.name} />
  {/if}
  <Toolbar tabbar position="top">
    <Link tabLink="#tab-1" tabLinkActive>Info</Link>
    <Link tabLink="#tab-2">Gallery</Link>
    <Link tabLink="#tab-3" on:click={resizes}>Location</Link>
  </Toolbar>
  <Tabs>
    {#if $libraryResult.length != 0}
      <Tab id="tab-1" tabActive>
        <Block strong>
          <Info data={$libraryResult} />
        </Block>
      </Tab>
      <Tab id="tab-2">
        <Block strong>
          {#if $libraryResult.id}
            <Gallery photos={$libraryResult.imagesContent} />
          {/if}
        </Block>
      </Tab>
    {/if}
    <Tab id="tab-3">
      <Block strong>
        <div class="map-wrap">
          <Map
            bind:this={mapComponent}
            accessToken={mapboxToken}
            style="mapbox://styles/warmoa/cl3wwp1qa000414mqrf1cx8b4"
            {center}
            bind:zoom
          >
            <Direction
              dirWalking={getDirection("walking")}
              dirDriving={getDirection("driving")}
              coords={loc}
            />
          </Map>
        </div>
      </Block>
    </Tab>
  </Tabs>
</Page>

<style>
  .map-wrap {
    width: 100%;
    height: 70vh;
  }
</style>
