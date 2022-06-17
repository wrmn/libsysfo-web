<script>
  import {
    Page,
    Preloader,
    Toolbar,
    Link,
    Block,
    Button,
    Tabs,
    Tab,
    Col,
    Row,
  } from "framework7-svelte";

  import StandardHeader from "../../components/standardHeader.svelte";
  import Gallery from "./detail/gallery.svelte";
  import Info from "./detail/info.svelte";

  import { onDestroy, onMount } from "svelte";
  import { Map, Marker, controls } from "@beyonk/svelte-mapbox";
  import { libraryResult } from "../../stores/data";

  export let f7route;

  const mapboxToken =
    "pk.eyJ1Ijoid2FybW9hIiwiYSI6ImNsM3U0dThidDFlaTgzYmx0cTN6N2c2ZG8ifQ.UE81Ntp9JdS7LeYZRXjCvg";
  let center = { lat: -0.9345808, lng: 100.37 };
  let mapComponent, lat, lng;
  let zoom = 11.5;

  const { GeolocateControl, NavigationControl } = controls;

  onMount(() => {
    dataSample(f7route.params["libraryId"]);
  });

  onDestroy(() => {
    libraryResult.set([]);
  });

  var handleError = function (err) {
    console.warn(err);
    libraryResult.set(err.message);

    return new Response(
      JSON.stringify({
        code: 400,
        message: "Stupid network Error",
      })
    );
  };

  const dataSample = async (id) => {
    const response = await fetch(
      `https://young-castle-31877.herokuapp.com/library/${id}`
    ).catch(handleError);
    const msg = await response.json();

    libraryResult.set(msg);
    lat = msg.coordinate.latitude;
    lng = msg.coordinate.longitude;
    mapComponent.setCenter([lng, lat]);
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
            <Gallery photos={$libraryResult.images.content} />
          {/if}
        </Block>
      </Tab>
    {/if}
    <Tab id="tab-3">
      <Block strong>
        <Row>
          <Col width="100" medium="20">
            <Button
              fill
              raised
              on:click={() => {
                console.log("nnice");
              }}>nice</Button
            >
          </Col>
          <Col width="100" medium="80">
            <div class="map-wrap">
              <Map
                bind:this={mapComponent}
                accessToken={mapboxToken}
                {center}
                bind:zoom
              >
                <NavigationControl />
                <GeolocateControl
                  on:geolocate={(e) => console.log("geolocated", e.detail)}
                />
                <Marker bind:lat bind:lng />
              </Map>
            </div>
          </Col>
        </Row>
      </Block>
    </Tab>
  </Tabs>
</Page>

<style>
  .map-wrap {
    width: 100%;
    height: 75vh;
  }
</style>
