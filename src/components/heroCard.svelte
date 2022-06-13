<script>
  import { Card, Icon, Button } from "framework7-svelte";
  export let data;
</script>

<Card class="elevation-24">
  <div class="card">
    <div class="border" />
    <img src={data.image} alt="" />
    <h1 class="make-capital">{data.content}</h1>
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
    bottom: 10px;
    position: absolute;
    width: 80%;
    padding-left: 15%;
  }

  .card {
    width: 92%;
    max-width: 500px;
    min-height: 450px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-bottom: 60px;
    background-color: #b9a090;
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

  .card h1 {
    position: relative;
    padding: 250px 10px 0px 10px;
    width: 90%;
    color: black;
  }

  .card > img {
    width: 90%;
    position: absolute;
    top: -10%;
    left: -10%;
    height: 300px;
  }
</style>
