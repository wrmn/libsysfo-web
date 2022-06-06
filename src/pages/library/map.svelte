<script>
  import { Page, Navbar } from "framework7-svelte";
  import { Map, Marker, controls } from "@beyonk/svelte-mapbox";
  import { onDestroy, onMount } from "svelte";
  const { GeolocateControl, NavigationControl, ScaleControl } = controls;

  const place = null;
  const mapboxToken =
    "pk.eyJ1Ijoid2FybW9hIiwiYSI6ImNsM3U0dThidDFlaTgzYmx0cTN6N2c2ZG8ifQ.UE81Ntp9JdS7LeYZRXjCvg";
  let center = { lat: 53.3358627, lng: -2.8572362 };
  let marker = center;
  let mapComponent;
  let zoom = 11.15;

  function randomLng() {
    return 77 + (Math.random() - 0.5) * 30;
  }

  function randomLat() {
    return 13 + (Math.random() - 0.5) * 30;
  }

  function flyToRandomPlace() {
    mapComponent.flyTo({
      center: [randomLng(), randomLat()],
      essential: true,
    });
  }

  function recentre({ detail }) {
    center = detail.center;
  }

  function drag({ detail }) {
    marker = detail.center;
  }
</script>

<Page name="map">
  <Navbar title="Maps" />
  <div class="section-txt" id="map">
    <div class="content-info">
      <div class="action-buttons">
        <button id="fly-to" on:click={flyToRandomPlace}
          >Fly to random location</button
        >

        <button
          id="change-zoom"
          on:click={() => (zoom = Math.floor(Math.random() * 10))}
          >Change Zoom Level</button
        >
      </div>
      <div class="map-wrap">
        <Map
          bind:this={mapComponent}
          accessToken={mapboxToken}
          on:recentre={recentre}
          on:drag={drag}
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
    </div>
  </div>
</Page>

<style>
  .map-wrap {
    width: 100%;
    height: 500px;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
  }

  #fly-to,
  #change-zoom {
    display: block;
    position: relative;
    margin: 0px auto;
    height: 40px;
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    background: #ee8a65;
  }
</style>
