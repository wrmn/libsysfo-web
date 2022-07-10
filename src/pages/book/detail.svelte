<script>
  import {
    Page,
    f7,
    Toolbar,
    Link,
    Tabs,
    Card,
    CardContent,
    Button,
    Icon,
    Badge,
    Tab,
    Row,
    Preloader,
    app,
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
    if (f7route.query["library"]) {
      library = f7route.query["library"];
    } else {
      library = 0;
    }
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
    if (response.status != 200) {
      handleError("service unavailable");
      return;
    }
    const msg = await response.json();
    bookResult.set(msg.data);
  };

  const newBorrow = async (collectionId) => {
    const reqBody = {
      collectionId,
    };
    console.log(JSON.stringify(reqBody));

    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/borrow/new`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(reqBody),
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();

    if (response.status != 200) {
      f7.dialog.alert(msg.description, "Task Failed!");
      return;
    }
    f7.dialog.alert(msg.description, "", () => {
      f7.views.main.router.navigate("/book/borrow/");
    });
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
    <StandardHeader title={$bookResult.book.title} />

    <MainCard
      mainImage={$bookResult.book.image
        ? $bookResult.book.image
        : "https://dummyimage.com/600x400/ababab/0011ff"}
    >
      <span slot="name"> {$bookResult.book.title}</span>
      <span slot="details">
        <table width="100%">
          <tbody>
            <tr>
              <td class="label-cell">Author : </td>
              <td class="label-cell">{$bookResult.book.author}</td>
            </tr>
            <tr>
              <td class="label-cell">Publisher : </td>
              <td class="label-cell">
                {$bookResult.book.publisher ? $bookResult.book.publisher : "-"}
              </td>
            </tr>
            <tr>
              <td class="label-cell">Page Total : </td>
              <td class="label-cell">
                {$bookResult.book.pageCount ? $bookResult.book.pageCount : "-"}
              </td>
            </tr>
            <tr>
              <td class="label-cell">Category : </td>
              <td class="label-cell">
                {$bookResult.book.category ? $bookResult.book.category : "-"}
              </td>
            </tr>
            <tr>
              <td class="label-cell">Language : </td>
              <td class="label-cell">
                {$bookResult.book.language ? $bookResult.book.language : "-"}
              </td>
            </tr>
            <tr>
              <td class="label-cell">Country : </td>
              <td class="label-cell">
                {$bookResult.book.country ? $bookResult.book.country : "-"}
              </td>
            </tr>
          </tbody>
        </table>
        {#if $bookResult.book.source == "gramedia"}
          <Button
            view=".view-main"
            class="elevation-12 link external"
            href={$bookResult.book.origin
              ? $bookResult.book.origin
              : `https://ebooks.gramedia.com/books/${$bookResult.book.slug}`}
            color="deepOrange"
            fill
            round
            raised
          >
            Lihat di Gramedia
            <Icon f7="arrow_right" />
          </Button>
        {/if}
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
                <div class="text-align-justify">
                  {$bookResult.book.description
                    ? $bookResult.book.description
                    : "Description unavailable"}
                </div>
              </CardContent>
            </Card>
          </Tab>
          <Tab id="tab-2">
            <Card class="demo-card-header-pic">
              <CardContent>
                {#if $bookResult.collection.length != 0}
                  <table width="100%" class="text-align-center">
                    <thead>
                      <tr>
                        <th class="label-cell">Perpustakaan</th>
                        <th class="label-cell">Serial Number</th>
                        <th class="label-cell">Status</th>
                        <th class="label-cell">Kondisi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each $bookResult.collection as a}
                        {#if library == 0 || library == a.libraryId}
                          <tr>
                            <td class="label-cell make-capital"
                              ><Link href={`/library/detail/${a.libraryId}/`}
                                >{a.name}</Link
                              ></td
                            >
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
                                <Badge color="yellow" tooltip="Kondisi" /> Layak
                                Baca
                              {:else if a.status == 4}
                                <Badge color="red" tooltip="Kondisi" /> Rusak
                              {/if}
                            </td>
                            <td class="label-cell">
                              {#if a.availability}
                                <Button
                                  fill
                                  on:click={() => {
                                    newBorrow(a.id);
                                  }}
                                >
                                  Ajukan Peminjaman
                                </Button>
                              {/if}
                            </td>

                            <td class="label-cell" />
                          </tr>
                        {/if}
                      {/each}
                    </tbody>
                  </table>
                {:else}
                  Buku tidak ditemukan di perpustakaan manapun
                {/if}
              </CardContent>
            </Card>
          </Tab>
        </Tabs>
      </span>
    </MainCard>
  {/if}
</Page>
