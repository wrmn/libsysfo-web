<script>
  import {
    theme,
    Button,
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

  let component;
  export let bookPopup = false;
</script>

<Popup
  class="demo-popup"
  opened={bookPopup}
  onPopupClosed={() => (bookPopup = false)}
>
  <Page>
    <Navbar title="Koleksi Buku">
      <NavRight>
        <Link popupClose iconF7="xmark" iconSize="35px" />
      </NavRight>
    </Navbar>
    <Searchbar
      searchContainer=".search-list"
      searchIn=".item-title, .item-subtitle, .item-text"
      disableButton={!theme.aurora}
    />
    <List class="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    <List class="search-list searchbar-found">
      <List mediaList>
        {#if $libraryResult.book}
          {#each $libraryResult.book as book}
            <ListItem
              title={book.title}
              link={`/book/detail/${book.slug}/?library=${$libraryResult.id}`}
              popupClose
              subtitle={book.category}
              text={book.description}
            >
              <Badge color={book.status.availability ? "green" : "red"} />
              {book.status.availability ? "Tersedia" : "Tidak Tersedia"}
              {#if book.status.status == 1}
                <Badge color="blue" tooltip="Kondisi" /> Baru
              {:else if book.status.status == 2}
                <Badge color="green" tooltip="Kondisi" /> Baik
              {:else if book.status.status == 3}
                <Badge color="yellow" tooltip="Kondisi" /> Layak Baca
              {:else if book.status.status == 4}
                <Badge color="red" tooltip="Kondisi" /> Rusak
              {/if}
              <img slot="media" src={book.image} width="80" alt="" />
            </ListItem>
          {/each}
        {:else}
          <h3>Library don't have any book collection yet</h3>
        {/if}
      </List>
    </List>
  </Page>
</Popup>
