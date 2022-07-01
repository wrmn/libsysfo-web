<script>
  import {
    Block,
    Segmented,
    Button,
    Row,
    Preloader,
    Col,
  } from "framework7-svelte";
  import ContentCard from "../../components/card/contentCard.svelte";
  import { dataResult } from "../../stores/data";

  export let switchPage = {};
</script>

<Block strong>
  <Row class="search-list searchbar-found">
    {#if typeof $dataResult == "object"}
      {#if $dataResult.length == 0}
        <div class="make-center">
          <Preloader color="multi" />
        </div>
      {/if}
      {#each $dataResult as sample}
        <Col width="100" medium="50">
          <ContentCard data={sample}>
            <span slot="content">
              {@html sample.information}
            </span>
          </ContentCard>
        </Col>
      {/each}
    {:else}
      {$dataResult}
    {/if}
  </Row>
  <Segmented round tag="p">
    <Button
      round
      outline
      disabled={!switchPage.prev}
      onClick={() => {
        switchPage.prev();
      }}>Previous</Button
    >
    <Button
      round
      outline
      disabled={!switchPage.next}
      onClick={() => {
        switchPage.next();
      }}>Next</Button
    >
  </Segmented>
</Block>
