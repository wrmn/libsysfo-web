<script>
  import {
    Page,
    List,
    ListItem,
    Navbar,
    Card,
    CardContent,
    CardHeader,
    Link,
  } from "framework7-svelte";
  import { menus } from "../../stores/library";
</script>

<Page name="home">
  <Navbar title="Book" backLink="Back" />
  <List>
    {#each $menus as menu}
      <ListItem link={menu.url} view=".view-main" title={menu.text} />
    {/each}
  </List>
  <Card expandable>
    <CardContent padding={false}>
      <div class="bg-color-red" style="height: 300px">
        <CardHeader textColor="white" class="display-block">
          Framework7
          <br />
          <small style="opacity: 0.7">Build Mobile Apps</small>
        </CardHeader>
        <Link
          cardClose
          color="white"
          class="card-opened-fade-in"
          style="position: absolute; right: 15px; top: 15px"
          iconF7="xmark_circle_fill"
        />
      </div>
      <div class="card-content-padding">
        <p>
          Framework7 - is a free and open source HTML mobile framework to
          develop hybrid mobile apps or web apps with iOS or Android (Material)
          native look and feel. It is also an indispensable prototyping apps
          tool to show working app prototype as soon as possible in case you
          need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).
        </p>
      </div>
    </CardContent>
  </Card>
</Page>
