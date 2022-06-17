<script>
  import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    Link,
    Block,
    Row,
    Col,
  } from "framework7-svelte";

  import HeroCard from "../components/card/heroCard.svelte";
  import { mainCards } from "../stores/main";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Alata&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Page name="home">
  <Navbar sliding={false}>
    <NavLeft>
      <Link
        iconIos="f7:menu"
        iconAurora="f7:menu"
        iconMd="material:menu"
        panelOpen="left"
      />
    </NavLeft>
    <NavTitle sliding>Library Information System</NavTitle>
  </Navbar>
  <Block>
    <Row>
      <Col width="100" medium="50">
        <div class="main-image title">
          <div>AKSES</div>
          <div>JENDELA DUNIA</div>
          <div>DARI</div>
          <div>GENGGAMAN</div>
        </div>
      </Col>
      {#each $mainCards as card}
        <Col width="100" medium="50">
          <HeroCard data={card} />
        </Col>
      {/each}
    </Row>
  </Block>
</Page>

<style>
  .main-image {
    margin: auto;
    height: 450px;
    background-image: url("../assets/images/hero-2.svg");
    background-position: right bottom;
    background-size: 350px;
    background-repeat: no-repeat;
    font-family: "Alata", sans-serif;

    max-width: 500px;
    font-size: 3em;
    font-weight: 500;
  }
</style>
