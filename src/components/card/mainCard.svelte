<script>
  import { Card, Row, Col } from "framework7-svelte";
  export let mainImage;
</script>

<Card class="elevation-24">
  <div class="card card-local">
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

    <div class="button-container">
      <slot name="action" />
    </div>
  </div>
</Card>

<style>
  .card-local {
    width: 75%;
    min-height: 450px;
  }

  .card-local h1 {
    position: relative;
    padding-right: auto;
    padding-left: auto;
    text-align: center;
  }

  .card-local .button-container {
    width: 80%;
    padding-left: 15%;
  }

  .card-local .info-container {
    width: 100%;
    padding-left: 0;
    padding-bottom: 10vh;
  }

  img {
    width: 90%;
    max-width: 500px;
    padding: 5%;
    height: 300px;
    object-fit: cover;
    object-position: center;
  }
</style>
