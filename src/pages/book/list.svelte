<script>
  import { Page } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import ListPage from "../../components/page/listPage.svelte";
  import { onMount, onDestroy } from "svelte";
  import { dataResult } from "../../stores/data";

  let switchPage = {};
  let displayData = [];
  let page = 1;
  let box;

  onMount(() => {
    dataResult.set([]);
    getData(page);
  });

  onDestroy(() => {
    dataResult.set([]);
    displayData = [];
  });

  var handleError = function (err) {
    console.warn(err);
    dataResult.set(err.message);
  };

  const getData = async (page) => {
    dataResult.set([]);
    displayData = [];
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/book?page=${page}`
    ).catch(handleError);
    const msg = await response.json();
    msg.data.book.forEach((e) => {
      displayData.push({
        image: e.image,
        name: e.title,
        information: `Oleh : ${e.author}`,
        path: `/book/detail/${e.slug}/`,
      });
    });

    switchPage = {
      next: nextPage,
      prev: prevPage,
    };
    if (page <= 1) {
      switchPage.prev = null;
    }
    dataResult.set(displayData);
  };

  const nextPage = () => {
    page += 1;
    getData(page);
    box.scrollIntoView();
  };

  const prevPage = () => {
    page -= 1;
    getData(page);
    box.scrollIntoView();
  };
</script>

<!-- TODO: Add searchbar-->
<Page>
  <div class="box" bind:this={box} />
  <StandardHeader title="Book List" />
  <ListPage bind:switchPage />
</Page>

<style>
  .box {
    position: absolute;
    top: -20px;
    visibility: hidden;
  }
</style>
