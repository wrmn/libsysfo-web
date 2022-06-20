<script>
  import { Page, Searchbar, ListItem, List } from "framework7-svelte";

  import IndexPage from "../../components/page/indexPage.svelte";
  import { faqItem } from "../../stores/main";
</script>

<Page name="home">
  <IndexPage title="About" heroImg="./static/images/hero-13.svg">
    <span slot="title">
      <div>CARA MENGGUNAKAN</div>
      <div>LIBRARY INFORMATION SYSTEM</div>
    </span>
    <span slot="content">
      <Searchbar
        class="searchbar-demo"
        searchContainer=".search-list"
        searchIn=".item-title"
      />
      <div class="list-container">
        <List class="searchbar-not-found">
          <ListItem title="Nothing found" />
        </List>
        <List class="search-list searchbar-found" mediaList>
          {#each $faqItem as e}
            <ListItem
              link="#"
              title={e.title}
              subtitle={e.category}
              text={e.text}
            />
          {/each}
        </List>
      </div>
    </span>
  </IndexPage>
</Page>

<style>
  .list-container {
    height: 80vh;
    overflow: auto;
  }
</style>
