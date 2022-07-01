<script>
  import { Card, Icon, Button } from "framework7-svelte";
  export let data;
</script>

<Card class="elevation-24">
  <div class="my-card card-local">
    <div class="border" />
    <img src={data.image} alt="" />
    <div class="info-container">
      <div class="title">
        <h2 class="make-capital">{data.name}</h2>
      </div>
      <slot name="content" />
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
