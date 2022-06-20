<script>
  import {
    Page,
    List,
    ListInput,
    Button,
    Icon,
    Row,
    Col,
  } from "framework7-svelte";
  import { contactContent } from "../../stores/main";
  import IndexPage from "../../components/page/indexPage.svelte";
</script>

<Page name="home">
  <IndexPage title="Paper" heroImg="./static/images/hero-11.svg">
    <span slot="title">
      <div>HUBUNGI TEAM PENGEMBANG KAMI</div>
    </span>
    <span slot="content">
      <div class="form-container">
        <List noHairlinesMd>
          {#each $contactContent.form as e}
            <ListInput
              label={e.label}
              floatingLabel
              type={e.type}
              placeholder={e.placeholder}
              resizeable={e.resizeable}
            >
              <Icon slot="media" f7={e.icon} />
            </ListInput>
          {/each}

          <Button fill>Submit</Button>
        </List>
        <div class="button-container">
          <Row>
            {#each $contactContent.button as e}
              <Col width="15">
                <Button round>
                  <Icon f7={e.name} color={e.color} />
                </Button>
              </Col>
            {/each}
          </Row>
        </div>
      </div>
    </span>
  </IndexPage>
</Page>

<style>
  .button-container {
    padding-top: 5%;
  }

  .form-container {
    padding-right: 5%;
    padding-left: 5%;
  }
</style>
