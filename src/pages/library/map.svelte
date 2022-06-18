<script>
  import { onDestroy, onMount } from "svelte";
  import { Page, Block } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { Map } from "@beyonk/svelte-mapbox";
  import { geoData } from "../../stores/data";
  import AllMarker from "./map/_AllMarker.svelte";

  let mapComponent;
  const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;
  let zoom = 12;
  let center = { lat: -0.9345808, lng: 100.39 };
  let displayData = [];

  onMount(() => {
    dataSample();
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  });

  onDestroy(() => {
    displayData = [];
  });

  var handleError = function (err) {
    console.warn(err);
    alert(err.message);
  };

  const dataSample = async () => {
    const response = await fetch(
      "https://young-castle-31877.herokuapp.com/library"
    ).catch(handleError);
    const msg = await response.json();
    msg.data.forEach((e) => {
      displayData.push({
        header: "lihat perpustakaan",
        address: e.address,
        image: e.images.main,
        coordinate: e.coordinate,
        content: e.name,
        path: `/library/detail/${e.id}/`,
      });
    });
  };

  function locationSuccess(position) {
    geoData.set([position.coords.longitude, position.coords.latitude]);
  }

  function locationError(error) {
    const message = error.message;
    alert(message);
  }
</script>

<Page name="home">
  <StandardHeader title="Library Map" />
  <Block strong>
    <div class="map-wrap">
      <Map
        bind:this={mapComponent}
        accessToken={mapboxToken}
        style="mapbox://styles/warmoa/cl3wwp1qa000414mqrf1cx8b4"
        {center}
        bind:zoom
      >
        <AllMarker bind:displayData />
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
