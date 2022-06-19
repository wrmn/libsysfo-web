<script>
  import { Card, Icon, Button } from "framework7-svelte";
  export let data;
</script>

<Card class="elevation-24">
  <div class="my-card card-local">
    <div class="border" />
    <img src={data.image} alt="" />
    <div class="button-container button-container-local">
      <Button
        href={data.path}
        view=".view-main"
        class="elevation-12"
        color="deepOrange"
        fill
        round
        raised
      >
        {data.header}
        <Icon f7="arrow_right" />
      </Button>
    </div>
  </div>
</Card>

<style>
  .button-container-local {
    width: 80%;
    padding-left: 15%;
  }

  .card-local {
    max-width: 500px;
    min-height: 200px;
  }

  .my-card > img {
    width: 90%;
    position: absolute;
    top: -10%;
    height: 150px;
  }
</style>
