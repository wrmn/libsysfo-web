<script>
  import { Page, Col, Row } from "framework7-svelte";
  import { libraryCards } from "../../stores/main";
  import StandardHeader from "../../components/standardHeader.svelte";
  import MenuCard from "../../components/menuCard.svelte";
</script>

<Page name="home">
  <StandardHeader title="Library " />
  <Row>
    <Col width="100" medium="50">
      <div class="main-image title">
        <div>TEMUKAN PERPUSTAKAAN</div>
        <div>DI SEKITARMU</div>
      </div>
    </Col>
    <Col width="100" medium="50">
      <Row>
        {#each $libraryCards as card}
          <Col width="100">
            <MenuCard data={card} />
          </Col>
        {/each}
      </Row>
    </Col>
  </Row>
</Page>

<style>
  .main-image {
    margin: auto;
    height: 450px;
    background-image: url("../assets/images/hero-1.svg");
    background-position: right bottom;
    background-size: 350px;
    background-repeat: no-repeat;
    font-family: "Alata", sans-serif;
    margin-bottom: 10%;
    max-width: 500px;
    font-size: 3em;
    font-weight: 500;
  }
</style>
