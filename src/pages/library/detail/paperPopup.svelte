<script>
  import {
    theme,
    Popup,
    Page,
    Navbar,
    NavRight,
    Searchbar,
    Link,
    Badge,
    List,
    ListItem,
  } from "framework7-svelte";
  import { libraryResult } from "../../../stores/data";

  export let paperPopup = false;

  const infoGenerator = (data) => {
    let desc = "";
    const ekey = Object.keys(data.description);
    const evalue = Object.values(data.description);
    ekey.forEach((f, i) => {
      desc = `${desc}${ekey[i]} : ${evalue[i]} | | `;
    });
    return `${desc}Subject: ${data.subject}`;
  };
</script>

<Popup
  class="demo-popup"
  opened={paperPopup}
  onPopupClosed={() => (paperPopup = false)}
>
  <Page>
    <Navbar title="Koleksi Buku">
      <NavRight>
        <Link popupClose iconF7="xmark" iconSize="35px" />
      </NavRight>
    </Navbar>
    <Searchbar
      searchContainer=".search-list"
      searchIn=".item-title, .item-subtitle, .item-text, .item-header"
      disableButton={!theme.aurora}
    />
    <List class="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    <List class="search-list searchbar-found">
      <List mediaList>
        {#each $libraryResult.paperCollection as paper}
          <ListItem
            link={paper.id}
            title={paper.title}
            text={paper.abstract}
            header={infoGenerator(paper)}
            tooltip={infoGenerator(paper)}
          >
            <Badge
              color={paper.access ? "green" : "red"}
              tooltip="Akses Dari Libsysfo"
              >{paper.access ? "Bisa Diakses" : "Tidak Bisa Diakses"}</Badge
            >
            <img
              slot="media"
              src="https://pict.sindonews.net/dyn/620/pena/news/2020/12/05/207/257920/beberapa-cara-mudah-untuk-mengonversi-file-ke-pdf-jxi.jpg"
              width="80"
              alt=""
            />
          </ListItem>
        {/each}
      </List>
    </List>
  </Page>
</Popup>
