<script>
  import {
    Page,
    Preloader,
    Toolbar,
    Link,
    Block,
    Tabs,
    f7,
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
  let location;
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
    location = true;
    loc.src = [position.coords.longitude, position.coords.latitude];
  }

  function locationError(error) {
    location = false;
    f7.dialog.alert(
      "Harap izinkan Libsysfo mengakses lokasi anda untuk perutean",
      "Izin Lokasi ditolak"
    );
  }

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };

  const dataSample = async (id) => {
    libraryResult.set([]);
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/library/${id}`
    ).catch(handleError);
    const msg = await response.json();
    const dataBody = msg.data.library;
    dataBody.book = msg.data.book;
    dataBody.paper = msg.data.paper;

    libraryResult.set(dataBody);
    loc.dst = msg.data.library.coordinate;
    mapComponent.setCenter(loc.dst);
    zoom = 15;
  };

  function resizes() {
    mapComponent.resize();
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
    <Link tabLink="#tab-info" tabLinkActive>Info</Link>
    <Link tabLink="#tab-gallery">Gallery</Link>
    <Link tabLink="#tab-location" on:click={resizes}>Location</Link>
  </Toolbar>
  <Tabs>
    {#if $libraryResult.length != 0}
      <Tab id="tab-info" tabActive>
        <Block strong>
          <Info data={$libraryResult} />
        </Block>
      </Tab>
      <Tab id="tab-gallery">
        <Block strong>
          {#if $libraryResult.id}
            <Gallery photos={$libraryResult.imagesContent} />
          {/if}
        </Block>
      </Tab>
    {/if}
    <Tab id="tab-location">
      <Block strong>
        <div class="map-wrap">
          <Map
            bind:this={mapComponent}
            accessToken={mapboxToken}
            style="mapbox://styles/warmoa/cl3wwp1qa000414mqrf1cx8b4"
            {center}
            bind:zoom
          >
            <Direction coords={loc} bind:location />
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
