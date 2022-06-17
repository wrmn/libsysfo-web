<script>
  import { Page, Col, Row } from "framework7-svelte";
  import { paperCards } from "../../stores/main";
  import MenuCard from "../../components/card/menuCard.svelte";

  import IndexPage from "../../components/page/indexPage.svelte";
</script>

<Page name="home">
  <IndexPage title="Paper" heroImg="./static/images/hero-4.svg">
    <span slot="title">
      <div>AKSES PENILITIAN</div>
      <div>YANG DITULIS DALAM JURNAL</div>
    </span>
    <span slot="content">
      <Row>
        {#each $paperCards as card}
          <Col width="100">
            <MenuCard data={card} />
          </Col>
        {/each}
      </Row>
    </span>
  </IndexPage>
</Page>
