<script>
  import { Col, Row } from "framework7-svelte";
  import StandardHeader from "../standardHeader.svelte";

  export let title, heroImg;
</script>

<StandardHeader {title} />
<Row>
  <Col width="100" medium="50">
    <div class="main-image title">
      <slot name="title" />
    </div>
    <div class="image-container">
      <img src={heroImg} alt="" height="200" />
    </div>
  </Col>
  <Col width="100" medium="50">
    <slot name="content" />
  </Col>
</Row>

<style>
  .main-image {
    margin: auto;
    font-family: "Alata", sans-serif;
    margin-bottom: 10%;
    max-width: 500px;
    font-size: 3em;
    font-weight: 500;
  }
  .image-container {
    padding-left: 25%;
    width: 50%;
  }
</style>
