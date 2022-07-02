<script>
  import MainCard from "../../../components/card/mainCard.svelte";
  import { Button, Icon, Row, Col } from "framework7-svelte";
  import BookPopup from "./bookPopup.svelte";
  import PaperPopup from "./paperPopup.svelte";

  export let data;
  let bookPopup = false;
  let paperPopup = false;
</script>

<BookPopup bind:bookPopup />
<PaperPopup bind:paperPopup />
<MainCard
  mainImage={data.imagesMain
    ? data.imagesMain
    : "https://dummyimage.com/600x400/ababab/0011ff"}
>
  <span slot="name"> {data.name}</span>
  <span slot="details">
    {data.description}
    <br />
    <br />
    {data.address}
  </span>
  <span slot="action">
    <Row>
      <Col width="50">
        <Button
          view=".view-main"
          class="elevation-12 link external"
          onClick={() => {
            bookPopup = true;
          }}
          color="deepOrange"
          fill
          round
          raised
        >
          Buku
          <Icon f7="arrow_right" />
        </Button>
      </Col>
      <Col width="50">
        <Button
          view=".view-main"
          class="elevation-12 link external"
          onClick={() => {
            paperPopup = true;
          }}
          color="deepOrange"
          fill
          round
          raised
        >
          Jurnal
          <Icon f7="arrow_right" />
        </Button>
      </Col>
    </Row>
    <br />
    <Button
      view=".view-main"
      class="elevation-12 link external"
      href="https://pustaka.unand.ac.id/"
      color="deepOrange"
      fill
      round
      raised
    >
      Website
      <Icon f7="arrow_right" />
    </Button>
  </span>
</MainCard>
