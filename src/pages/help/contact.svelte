<script>
  import {
    Page,
    List,
    f7,
    ListInput,
    Button,
    Icon,
    Row,
    Col,
  } from "framework7-svelte";
  import { contactContent } from "../../stores/main";
  import IndexPage from "../../components/page/indexPage.svelte";
  let body = {};

  const sendFeedback = async () => {
    if (!body.name || !body.message) {
      f7.dialog.alert("Name and message can't be empty", "");
    }
    console.log(JSON.stringify(body));

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/feedback`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    console.log(msg);
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Failed!");
    } else {
      f7.dialog.alert(msg.description, "Feedback send!");
    }
  };

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };
</script>

<Page name="home">
  <IndexPage title="Contact" heroImg="./static/images/hero-11.svg">
    <span slot="title">
      <div>HUBUNGI TEAM PENGEMBANG KAMI</div>
    </span>
    <span slot="content">
      <div class="form-container">
        <List noHairlinesMd>
          {#each $contactContent.form as e}
            <ListInput
              label={e.label}
              bind:value={body[e.variable]}
              floatingLabel
              type={e.type}
              placeholder={e.placeholder}
              resizeable={e.resizeable}
            >
              <Icon slot="media" f7={e.icon} />
            </ListInput>
          {/each}

          <Button
            fill
            on:click={() => {
              sendFeedback();
            }}>Submit</Button
          >
        </List>
        <div class="button-container">
          <Row>
            {#each $contactContent.button as e}
              <Col width="15">
                <a href={e.link} round class="link external">
                  <Icon f7={e.name} color={e.color} />
                </a>
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
