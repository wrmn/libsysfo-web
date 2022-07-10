<script>
  import {
    Page,
    List,
    ListInput,
    ListItem,
    Row,
    Col,
    f7,
  } from "framework7-svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import ListPage from "../../components/page/listPage.svelte";
  import { onMount, onDestroy } from "svelte";
  import { dataResult } from "../../stores/data";
  import { bookCategory, bookLanguage } from "../../stores/main";

  let switchPage = {};
  let displayData = [];
  const filter = new URLSearchParams();
  let keyword, category, language, source;
  let external = true;
  let all = true;
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
    f7.dialog.alert(err, "Server timeout");
  };

  const getData = async (page = 1) => {
    dataResult.set([]);
    displayData = [];
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/book?page=${page}&${filter}`
    ).catch(handleError);
    const msg = await response.json();

    msg.data.book.forEach((e) => {
      let singleData = {
        image: e.image,
        name: e.title,
        information: `Oleh : ${e.author}`,
        path: `/book/detail/${e.slug}/`,
      };
      if (e.language) {
        singleData.information = `
        <br> Author : ${e.author}<br>
         Publisher : ${e.publisher}<br>
          ${e.language} / ${e.country}<br>
         ${e.category}
        `;
      }
      displayData.push(singleData);
    });

    switchPage = {
      next: nextPage,
      prev: prevPage,
    };
    if (page <= 1) {
      switchPage.prev = null;
    }
    if (displayData.length < 10) {
      switchPage.next = null;
    }
    if (displayData.length == 0) {
      f7.dialog.alert("Buku Tidak Ditemukan", "");
      dataResult.set("Buku Tidak Ditemukan");
      return;
    }
    dataResult.set(displayData);
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
  <StandardHeader title="Book List" />
  <List inlineLabels noHairlinesMd>
    <ListItem title="Filter" />
    <Row>
      <Col width="50" medium="30">
        <ListItem
          title="Source"
          inlineLabels
          noHairlinesMd
          smartSelect
          bind:this={source}
          smartSelectParams={{
            openIn: "popover",
            on: {
              close: function () {
                const src = source.smartSelectInstance().getValue();
                changeFilter("source", src);
                if (src != "local") {
                  external = true;
                  all = false;
                  if (src == "") {
                    all = true;
                  }
                } else {
                  all = false;
                  external = false;
                }
              },
            },
          }}
        >
          <select
            name="sumber"
            on:change={() => {
              filter.delete("category");
              filter.delete("language");
              source.smartSelectInstance().close();
            }}
          >
            <option value="">All</option>
            <option value="gramedia">Gramedia</option>
            <option value="local">Perpustakaan Kota Padang</option>
          </select>
        </ListItem>
      </Col>
      <Col width="50" medium="70">
        <div class:hide={all}>
          <ListInput
            type="text"
            placeholder="Keyword"
            clearButton
            on:change={() => {
              changeFilter("keyword", keyword);
            }}
            bind:value={keyword}
          />
        </div>
      </Col>
    </Row>
    <div class:hide={external}>
      <Row>
        <Col width="100" medium="50">
          <ListItem
            title="Category"
            inlineLabels
            noHairlinesMd
            smartSelect
            bind:this={category}
            smartSelectParams={{
              openIn: "popup",
              searchbar: true,
              searchbarPlaceholder: "Search Category",
              on: {
                close: function () {
                  changeFilter(
                    "category",
                    category.smartSelectInstance().getValue()
                  );
                },
              },
            }}
          >
            <select
              name="category"
              on:change={() => {
                category.smartSelectInstance().close();
              }}
            >
              <option value="">all</option>
              {#each $bookCategory as ctr}
                <option value={ctr}>{ctr}</option>
              {/each}
            </select>
          </ListItem>
        </Col>
        <Col width="100" medium="50">
          <ListItem
            title="Language"
            inlineLabels
            noHairlinesMd
            smartSelect
            bind:this={language}
            smartSelectParams={{
              openIn: "popover",
              on: {
                close: function () {
                  changeFilter(
                    "language",
                    language.smartSelectInstance().getValue()
                  );
                },
              },
            }}
          >
            <select
              name="language"
              on:change={() => {
                language.smartSelectInstance().close();
              }}
            >
              <option value="">all</option>
              {#each $bookLanguage as lng}
                <option value={lng}>{lng}</option>
              {/each}
            </select>
          </ListItem>
        </Col>
      </Row>
    </div>
  </List>
  <ListPage bind:switchPage />
</Page>

<style>
  .box {
    position: absolute;
    top: -20px;
    visibility: hidden;
  }

  .hide {
    visibility: hidden;
  }
</style>
