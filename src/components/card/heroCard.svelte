<script>
  import { Card, Icon, Button } from "framework7-svelte";
  export let data;
</script>

<Card class="elevation-24">
  <div class="card card-local">
    <div class="border" />
    <img src={data.image} alt="" />
    {#if data.content}
      <h1 class="make-capital">{data.content}</h1>
    {/if}
    <div class="button-container">
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
  .button-container {
    width: 80%;
    padding-left: 15%;
  }

  .card-local {
    max-width: 500px;
    min-height: 450px;
  }

  .card-local h1 {
    position: relative;
    padding: 250px 10px 0px 10px;
    width: 90%;
    color: black;
  }

  .card-local > img {
    width: 90%;
    top: -10%;
    left: -10%;
    height: 300px;
  }
</style>
