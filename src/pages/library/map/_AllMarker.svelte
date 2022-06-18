<script>
  import { List, ListItem, Searchbar } from "framework7-svelte";
  import { getContext } from "svelte";
  import { contextKey } from "@beyonk/svelte-mapbox";

  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();

  export let displayData = [];
  let mapMarker = [];
  let isHide = true;

  displayData.forEach((e) => {
    mapMarker.push(
      new mapbox.Marker()
        .setLngLat([e.coordinate.longitude, e.coordinate.latitude])
        .setPopup(
          new mapbox.Popup({
            closeButton: false,
          })
            .setHTML("<a class='button button-fill button-round'>Round</a>")
            .on("open", () => {
              console.log(e);
            })
        )
        .addTo(map)
    );
  });

  map.on("click", () => {
    isHide = true;
  });

  function toogleVisibility() {
    isHide = !isHide;
  }

  const nice = (data, i) => {
    isHide = true;
    mapMarker[i].togglePopup();
    map.flyTo({
      center: [data.longitude, data.latitude],
      zoom: 17,
    });
  };
</script>

<div class="searchbar-container">
  <Searchbar
    class="searchbar-demo"
    searchContainer=".search-list"
    searchIn=".item-title"
    placeholder=""
    inline
    on:focus={toogleVisibility}
  />
</div>

<div class:hide={isHide} class="list-container">
  <List class="searchbar-not-found">
    <ListItem title="Nothing found" />
  </List>
  <List class="search-list searchbar-found">
    {#each displayData as data, i}
      <ListItem
        link="#"
        title={data.content.replace(/\w\S*/g, (w) =>
          w.replace(/^\w/, (c) => c.toUpperCase())
        )}
        on:click={() => nice(data.coordinate, i)}
      />
    {/each}
  </List>
</div>

<style>
  .searchbar-container {
    width: 40vw;
    max-width: 300px;
    padding-left: 30px;
  }

  .list-container {
    width: 40vw;
    max-width: 600px;
    padding-left: 30px;
    margin-top: -30px;
    height: 300px;
    overflow: auto;
  }

  .hide {
    visibility: hidden;
  }
</style>
