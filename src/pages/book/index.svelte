<script>
  import { Page, Col, Row } from "framework7-svelte";
  import { bookCards } from "../../stores/main";
  import MenuCard from "../../components/card/menuCard.svelte";

  import IndexPage from "../../components/page/indexPage.svelte";
</script>

<Page name="home">
  <IndexPage title="Book" heroImg="./static/images/hero-3.svg">
    <span slot="title">
      <div>CARI, PINJAM, DAN PELAJARI</div>
      <div>BERBAGAI BUKU</div>
    </span>
    <span slot="content">
      <Row>
        {#each $bookCards as card}
          <Col width="100">
            <MenuCard data={card} />
          </Col>
        {/each}
      </Row>
    </span>
  </IndexPage>
</Page>
