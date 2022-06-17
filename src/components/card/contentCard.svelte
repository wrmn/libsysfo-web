<script>
  import { Card, Icon, Button } from "framework7-svelte";
  import * as turf from "@turf/turf";

  export let data;
  export let position = false;

  const measureDistance = (from, to) => {
    let fromPoint = turf.point(from);
    let toPoint = turf.point([to.longitude, to.latitude]);

    return turf.distance(fromPoint, toPoint, "kilometers");
  };
</script>

<Card class="elevation-24">
  <div class="card card-local">
    <div class="border" />
    <img src={data.image} alt="" />
    <div class="info-container">
      <div class="title">
        <h1 class="make-capital">{data.content}</h1>
      </div>
      {data.address}
      <br />
      {#if position}
        <Icon f7="map_pin_ellipse" slot="media" size="15px" />
        {measureDistance(position, data.coordinate).toFixed(2)} Km
      {/if}
    </div>
    <div class="button-container button-container-local">
      <Button
        href={data.path}
        view=".view-main"
        class="elevation-12"
        color="deepOrange"
        fill
        round
        raised
        small
      >
        <Icon f7="arrow_right" />
      </Button>
    </div>
  </div>
</Card>

<style>
  .button-container-local {
    width: 10%;
    padding-left: 85%;
  }

  .card-local {
    max-width: 600px;
    min-height: 250px;
  }

  .card-local .title {
    min-height: 125px;
  }

  .card-local > img {
    object-fit: cover;
    width: 45%;
    object-position: center;
  }
</style>
