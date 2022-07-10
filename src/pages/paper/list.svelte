<script>
  import {
    Page,
    List,
    ListItem,
    f7,
    Col,
    Row,
    ListInput,
  } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import ListPage from "../../components/page/listPage.svelte";
  import { onMount, onDestroy } from "svelte";
  import { dataResult } from "../../stores/data";

  let switchPage = {};
  let displayData = [];
  const filter = new URLSearchParams();
  let page = 1;
  let keyword;
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
    f7.dialog.alert(err, "Server timeout");
    dataResult.set(err.message);
  };

  const changeFilter = (type, value) => {
    filter.delete(type);
    const t = typeof value;
    switch (t) {
      case "string":
        if (value.length != 0) {
          filter.append(type, value);
        }
        break;
      default:
        break;
    }
    getData();
  };

  const getData = async (page) => {
    dataResult.set([]);
    displayData = [];
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/paper?page=${page}&${filter}`
    ).catch(handleError);
    const msg = await response.json();
    msg.data.paper.forEach((e) => {
      let desc = "";
      const ekey = Object.keys(e.description);
      const evalue = Object.values(e.description);
      ekey.forEach((f, i) => {
        desc = `${desc}${ekey[i]} : ${evalue[i]}<br>`;
      });
      displayData.push({
        image:
          "https://pict.sindonews.net/dyn/620/pena/news/2020/12/05/207/257920/beberapa-cara-mudah-untuk-mengonversi-file-ke-pdf-jxi.jpg",
        name: e.title,
        information: `${desc}Subject: ${e.subject}`,
        path: `/paper/detail/${e.id}/`,
      });
    });

    switchPage = {
      next: nextPage,
      prev: prevPage,
    };
    if (page <= 1) {
      switchPage.prev = null;
    }
    if (!msg.data.paginate.nextPage) {
      switchPage.next = null;
    }
    if (msg.data.paper.length == 0) {
      f7.dialog.alert("Data Tidak Ditemukan", "");
      dataResult.set("Data Tidak Ditemukan");
      return;
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

<Page>
  <div class="box" bind:this={box} />
  <StandardHeader title="Paper List" />
  <List inlineLabels noHairlinesMd>
    <ListItem title="Filter" />
    <Row>
      <Col width="10" />
      <Col width="90">
        <ListInput
          type="text"
          placeholder="Keyword"
          clearButton
          on:change={() => {
            changeFilter("keyword", keyword);
          }}
          bind:value={keyword}
        />
      </Col>
    </Row>
  </List>
  <ListPage bind:switchPage />
</Page>

<style>
  .box {
    position: absolute;
    top: -20px;
    visibility: hidden;
  }
</style>
