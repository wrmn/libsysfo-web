<script>
  import { f7, Page, Fab, Icon, FabButton } from "framework7-svelte";
  import { PdfViewer } from "svelte-pdf-simple";
  import StandardHeader from "../../components/standardHeader.svelte";

  export let f7route;
  // NOTE: Change when deploy
  // const pathToPdf = `http://localhost:5000/profile/permission/read/${f7route.params["permissionId"]}`;
  const pathToPdf = `https://young-castle-31877.herokuapp.com/profile/permission/read/${f7route.params["permissionId"]}`;

  let pdfViewer,
    pageNumber = 0,
    totalPages = 0,
    isPdfLoaded = false;

  const handleNextPage = (event) => {
    pageNumber++;
  };

  const handlePrevPage = (event) => {
    pageNumber--;
  };

  const onNextPage = () => {
    pdfViewer.next();
  };

  const onPrevPage = () => {
    pdfViewer.prev();
  };

  const handleLoadedSuccess = (event) => {
    totalPages = event.detail.pages;
    pageNumber = 1;
    isPdfLoaded = true;
  };

  const handleLoadFailure = (event) => {
    f7.dialog.alert("fail to load file", "");
  };
</script>

<Page>
  <StandardHeader title="Read" />
  {#if isPdfLoaded}
    <Fab position="right-bottom" on:click={onPrevPage}>
      <Icon ios="f7:arrow_left" aurora="f7:arrow_left" md="material:east" />
    </Fab>
    <Fab position="left-bottom" on:click={onNextPage}>
      <Icon ios="f7:arrow_right" aurora="f7:arrow_right" md="material:west" />
    </Fab>
    <span>{pageNumber}/{totalPages}</span>
  {/if}
  <PdfViewer
    bind:this={pdfViewer}
    on:next={handleNextPage}
    on:prev={handlePrevPage}
    on:load_success={handleLoadedSuccess}
    on:load_failure={handleLoadFailure}
    url={pathToPdf}
    httpHeaders={{
      authorization: `Bearer ${localStorage.getItem("account-credential")}`,
    }}
    style={"border: 1px solid black; display: block; margin: 10px auto; width:95%; "}
  >
    <svelte:fragment slot="loading">Loading pdf..</svelte:fragment>
    <svelte:fragment slot="loading-failed"
      >Well... something went wrong :(</svelte:fragment
    >
  </PdfViewer>
</Page>
