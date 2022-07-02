<script>
  import { Card, Row, Col } from "framework7-svelte";
  export let mainImage;
</script>

<Card class="elevation-24">
  <div class="my-card card-local">
    <div class="border" />
    <Row>
      <Col width="100" medium="50">
        <img src={mainImage} alt="" />
      </Col>
      <Col width="100" medium="50">
        <div class="info-container">
          <div class="title">
            <h1 class="make-capital">
              <slot name="name" />
            </h1>
          </div>
          <slot name="details" />
        </div>
      </Col>
    </Row>
  </div>
</Card>

<div class="button-container">
  <slot name="action" />
</div>

<style>
  .card-local {
    width: 75%;
    min-height: 350px;
    min-width: 300px;
  }

  .card-local h1 {
    position: relative;
    padding-right: auto;
    padding-left: auto;
    text-align: center;
  }

  .card-local .info-container {
    width: 90%;
    padding-left: 0;
    margin-left: 5%;
  }

  img {
    width: 90%;
    max-width: 500px;
    padding: 5%;
    max-height: 300px;
    object-fit: contain;
    object-position: center;
  }
</style>
