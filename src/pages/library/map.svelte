<script>
  import { Page, Block } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { Map } from "@beyonk/svelte-mapbox";
  import AllMarker from "./map/_AllMarker.svelte";

  const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;
  let zoom = 12;
  let center = { lat: -0.9345808, lng: 100.39 };
</script>

<Page name="home">
  <StandardHeader title="Library Map" />
  <Block strong>
    <div class="map-wrap">
      <Map
        accessToken={mapboxToken}
        style="mapbox://styles/warmoa/cl3wwp1qa000414mqrf1cx8b4"
        {center}
        bind:zoom
      >
        <AllMarker />
      </Map>
    </div>
  </Block>
</Page>

<style>
  .map-wrap {
    width: 100%;
    height: 70vh;
  }
</style>
