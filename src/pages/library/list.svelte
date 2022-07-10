<script>
  import { Page, Row, Preloader, Icon, Col, f7 } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import ContentCard from "../../components/card/contentCard.svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { dataResult, geoData } from "../../stores/data";
  import * as turf from "@turf/turf";

  let displayData = [];
  let location;

  onMount(() => {
    dataResult.set([]);
    getData();
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  });

  onDestroy(() => {
    dataResult.set([]);
    displayData = [];
  });

  var handleError = function (err) {
    console.warn(err);
    f7.dialog.alert(err, "Server timeout");
    dataResult.set(err.message);
  };

  const getData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/library`
    ).catch(handleError);
    const msg = await response.json();
    msg.data.library.forEach((e) => {
      displayData.push({
        address: e.address,
        image: e.imagesMain,
        coordinate: e.coordinate,
        name: e.name,
        path: `/library/detail/${e.id}/`,
      });
    });

    dataResult.set(displayData);
  };

  function locationSuccess(position) {
    location = true;
    geoData.set([position.coords.longitude, position.coords.latitude]);
  }

  function locationError(error) {
    location = false;
  }

  const measureDistance = (from, to) => {
    let fromPoint = turf.point(from);
    let toPoint = turf.point(to);

    return turf.distance(fromPoint, toPoint);
  };
</script>

<Page name="home">
  <StandardHeader title="Library List" />
  <Row class="search-list searchbar-found">
    {#if typeof $dataResult == "object"}
      {#if $dataResult.length == 0}
        <div class="make-center">
          <Preloader color="multi" />
        </div>
      {/if}
      {#each $dataResult as sample}
        <Col width="100" medium="50">
          <ContentCard data={sample}>
            <span slot="content">
              {sample.address}
              <br />
              {#if $geoData && sample.coordinate}
                <Icon f7="map_pin_ellipse" slot="media" size="15px" />
                {measureDistance($geoData, sample.coordinate).toFixed(2)} Km
              {/if}
            </span>
          </ContentCard>
        </Col>
      {/each}
    {:else}
      {$dataResult}
    {/if}
  </Row>
</Page>
