<script>
  import {
    Page,
    f7,
    Toolbar,
    Link,
    Tabs,
    Card,
    CardContent,
    Badge,
    Tab,
    Row,
    Preloader,
  } from "framework7-svelte";
  import { onMount, onDestroy } from "svelte";
  import MainCard from "../../components/card/mainCard.svelte";
  import StandardHeader from "../../components/standardHeader.svelte";
  import { bookResult } from "../../stores/data";

  export let f7route;
  export let f7router;

  let library;

  onMount(() => {
    getData(f7route.params["slug"]);
    library = f7route.query["library"];
  });

  onDestroy(() => {
    bookResult.set([]);
  });

  var handleError = function (err) {
    bookResult.set("error");
    console.warn(err);
    f7.dialog.alert("Detail Buku Tidak Tersedia", "", () => {
      f7router.back();
    });
  };

  const getData = async (slug) => {
    bookResult.set([]);
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/book/${slug}`
    ).catch(handleError);
    const msg = await response.json();
    console.log(msg);
    bookResult.set(msg.data.book);
  };
</script>

<Page>
  {#if $bookResult.length == 0}
    <StandardHeader title="Loading..." />
    <Row>
      <div class="make-center">
        <Preloader color="multi" />
      </div>
    </Row>
  {:else if $bookResult == "error"}
    <StandardHeader title={f7route.params["slug"]} />
  {:else}
    <StandardHeader title={$bookResult.title} />

    <MainCard
      mainImage={$bookResult.image
        ? $bookResult.image
        : "https://dummyimage.com/600x400/ababab/0011ff"}
    >
      <span slot="name"> {$bookResult.title}</span>
      <span slot="details">
        <table width="100%">
          <tbody>
            <tr>
              <td class="label-cell">Author : </td>
              <td class="label-cell">{$bookResult.author}</td>
            </tr>
            <tr>
              <td class="label-cell">Publisher : </td>
              <td class="label-cell">{$bookResult.publisher}</td>
            </tr>
            <tr>
              <td class="label-cell">Page Total : </td>
              <td class="label-cell">{$bookResult.pageCount}</td>
            </tr>
            <tr>
              <td class="label-cell">Category : </td>
              <td class="label-cell">{$bookResult.category}</td>
            </tr>
            <tr>
              <td class="label-cell">Language : </td>
              <td class="label-cell">{$bookResult.langauge}</td>
            </tr>
            <tr>
              <td class="label-cell">Country : </td>
              <td class="label-cell">{$bookResult.country}</td>
            </tr>
          </tbody>
        </table>
      </span>
      <span slot="action">
        <Toolbar tabbar bottom>
          <Link tabLink="#tab-1" tabLinkActive>Description</Link>
          <Link tabLink="#tab-2">Collection</Link>
        </Toolbar>
        <Tabs>
          <Tab id="tab-1" tabActive>
            <Card class="demo-card-header-pic">
              <CardContent>
                <div class="text-align-justify">{$bookResult.description}</div>
              </CardContent>
            </Card>
          </Tab>
          <Tab id="tab-2">
            {#if $bookResult.availableOn}
              <table width="100%">
                <thead>
                  <tr>
                    <th class="label-cell">Perpustakaan</th>
                    <th class="label-cell">Serial Number</th>
                    <th class="label-cell">Status</th>
                    <th class="label-cell">Kondisi</th>
                  </tr>
                </thead>
                <tbody>
                  {#each $bookResult.availableOn as a}
                    {#if library && library == a.libraryId}
                      <tr>
                        <td class="label-cell make-capital">{a.name}</td>
                        <td class="label-cell">{a.sn}</td>
                        <td class="label-cell">
                          <Badge color={a.availability ? "green" : "red"} />
                          {a.availability ? "Tersedia" : "Tidak Tersedia"}
                        </td>
                        <td class="label-cell">
                          {#if a.status == 1}
                            <Badge color="blue" tooltip="Kondisi" /> Baru
                          {:else if a.status == 2}
                            <Badge color="green" tooltip="Kondisi" /> Baik
                          {:else if a.status == 3}
                            <Badge color="yellow" tooltip="Kondisi" /> Layak Baca
                          {:else if a.status == 4}
                            <Badge color="red" tooltip="Kondisi" /> Rusak
                          {/if}
                        </td>
                        <td class="label-cell">Ajukan Peminjaman</td>

                        <td class="label-cell" />
                      </tr>
                    {/if}
                  {/each}
                </tbody>
              </table>
            {:else}
              <h1>Buku tidak ditemukan di perpustakaan manapun</h1>
            {/if}
          </Tab>
        </Tabs>
      </span>
    </MainCard>
  {/if}
</Page>
