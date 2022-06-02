<script>
  import { Page } from "framework7-svelte";
  import { Map, controls } from "@beyonk/svelte-mapbox";
  const { GeolocateControl, NavigationControl, ScaleControl } = controls;
</script>

<Page name="map">
  <Map
    accessToken="pk.eyJ1Ijoid2FybW9hIiwiYSI6ImNsM3U0dThidDFlaTgzYmx0cTN6N2c2ZG8ifQ.UE81Ntp9JdS7LeYZRXjCvg"
    center={[-87.661557, 41.893748]}
    style="mapbox://styles/warmoa/cl3wwp1qa000414mqrf1cx8b4"
    zoom={10.7}
    on:recentre={(e) => console.log(e.detail.center.lat, e.detail.center.lng)}
  >
    <NavigationControl />
    <GeolocateControl />
    <ScaleControl />
  </Map>
</Page>
