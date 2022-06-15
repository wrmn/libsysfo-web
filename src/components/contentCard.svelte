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
  <div class="card">
    <div class="border" />
    <img src={data.image} alt="" />
    <div class="info-container">
      <h1 class="make-capital">{data.content}</h1>

      {data.address}
      <br />
      {#if position != false}
        <Icon f7="map_pin_ellipse" slot="media" size="15px" />
        {measureDistance(position, data.coordinate).toFixed(2)} Km
      {/if}
    </div>
    <div class="button-container">
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
  .card .button-container {
    bottom: 10px;
    position: absolute;
    width: 10%;
    padding-left: 85%;
  }

  .card .info-container {
    bottom: 10px;
    padding: 10px 10px 0px 45%;
    width: 50%;
    position: relative;
    font-weight: 800;
  }

  .card {
    width: 96%;
    bottom: -10%;
    max-width: 600px;
    min-height: 250px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-bottom: 60px;
    background: rgb(185, 160, 144);
    background: linear-gradient(
      135deg,
      rgba(151, 120, 96, 0.3) 0%,
      rgba(185, 160, 144, 1) 95%
    );
  }

  .border {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 6px;
    border: 2.5px solid #b9a090;
    left: -6px;
    top: -6px;
  }

  .info-container {
    bottom: 0px;
    position: absolute;
  }

  .card > img {
    width: 45%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 5%;
    left: -5%;
    height: 84%;
  }
</style>
