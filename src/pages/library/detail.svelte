<script>
  import {
    Page,
    Navbar,
    Toolbar,
    Link,
    PhotoBrowser,
    Block,
    Tabs,
    Tab,
    Row,
    Col,
  } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import { Map, Marker, controls } from "@beyonk/svelte-mapbox";
  import { libraryResult } from "../../stores/data";

  export let f7route;

  const mapboxToken =
    "pk.eyJ1Ijoid2FybW9hIiwiYSI6ImNsM3U0dThidDFlaTgzYmx0cTN6N2c2ZG8ifQ.UE81Ntp9JdS7LeYZRXjCvg";
  let center = { lat: -0.9345808, lng: 100.37 };
  let marker = center;
  let mapComponent, latitude, longitude;
  let zoom = 11.5;
  let pageDark;

  const { GeolocateControl, NavigationControl } = controls;

  onMount(() => {
    dataSample(f7route.params["libraryId"]);
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  });

  onDestroy(() => {
    libraryResult.set([]);
  });

  function locationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  }

  function locationError(error) {
    const message = error.message;
    console.log(message);
  }

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
    mapComponent.setCenter({
      lat: msg.coordinate.latitude,
      lng: msg.coordinate.longitude,
    });
    marker = {
      lat: msg.coordinate.latitude,
      lng: msg.coordinate.longitude,
    };
    zoom = 15;
  };

  function resizes() {
    mapComponent.resize();
  }
</script>

<Page>
  <Navbar title="Dynamic Route" backLink="Back" />

  <Toolbar tabbar position="top">
    <Link tabLink="#tab-1" tabLinkActive>Info</Link>
    <Link tabLink="#tab-2">Gallery</Link>
    <Link tabLink="#tab-3" on:click={resizes}>Location</Link>
  </Toolbar>

  <Tabs>
    <Tab id="tab-1" tabActive>
      <Block strong>
        {JSON.stringify($libraryResult)}
        <ul>
          <li><b>Url:</b> {f7route.url}</li>
          <li><b>Path:</b> {f7route.path}</li>
          <li><b>Hash:</b> {f7route.hash}</li>
          <li>
            <b>Params:</b>
            <ul>
              {#each Object.keys(f7route.params) as key}
                <li><b>{key}:</b> {f7route.params[key]}</li>
              {/each}
            </ul>
          </li>
          <li>
            <b>Query:</b>
            <ul>
              {#each Object.keys(f7route.query) as key}
                <li><b>{key}:</b> {f7route.query[key]}</li>
              {/each}
            </ul>
          </li>
          <li><b>Route:</b> {f7route.route.path}</li>
        </ul>
      </Block>
    </Tab>
    <Tab id="tab-2">
      <Block>
        <p>Tab 2 content</p>
        <PhotoBrowser
          photos={$libraryResult.id ? $libraryResult.images.content : []}
          theme="dark"
          type="page"
          pageBackLinkText="Back"
          bind:this={pageDark}
        />
        {#if $libraryResult.id}
          <Row>
            {#each $libraryResult.images.content as link, i}
              <Col width="50" medium="25">
                <div on:click={() => pageDark.open(i)} class="image-container">
                  <img src={link} alt="" />
                </div>
              </Col>
            {/each}
          </Row>
        {/if}
      </Block>
    </Tab>
    <Tab id="tab-3">
      <Block>
        <p>Tab 3 content</p>
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
            <Marker lat={marker.lat} lng={marker.lng} />
          </Map>
        </div>
      </Block>
    </Tab>
  </Tabs>
</Page>

<style>
  .map-wrap {
    padding-left: 5%;
    width: 90%;
    height: 400px;
  }

  .image-container {
    width: 100%;
    height: 250px;
  }

  .image-container > img {
    height: 200px;
    width: 96%;
    padding-left: 2%;
    object-fit: cover;
    object-position: center bottom;
  }
</style>
