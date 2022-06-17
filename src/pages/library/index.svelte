<script>
  import { Page, Col, Row } from "framework7-svelte";
  import { libraryCards } from "../../stores/library";
  import MenuCard from "../../components/card/menuCard.svelte";

  import IndexPage from "../../components/page/indexPage.svelte";
</script>

<Page name="home">
  <IndexPage title="Library" heroImg="./static/images/hero-1.svg">
    <span slot="title">
      <div>TEMUKAN PERPUSTAKAAN</div>
      <div>DI SEKITARMU</div>
    </span>
    <span slot="content">
      <Row>
        {#each $libraryCards as card}
          <Col width="100">
            <MenuCard data={card} />
          </Col>
        {/each}
      </Row>
    </span>
  </IndexPage>
</Page>
