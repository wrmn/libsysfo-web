<script>
  import { Page } from "framework7-svelte";
  import { PdfViewer } from "svelte-pdf-simple";
  import StandardHeader from "../../components/standardHeader.svelte";

  export let f7route;
  // NOTE: Change when deploy
  const pathToPdf = `http://localhost:5000/profile/permission/read/${f7route.params["permissionId"]}`;
  // const pathToPdf = `https://young-castle-31877.herokuapp.com/profile/permission/read/${f7route.params["permissionId"]}`;
</script>

<Page>
  <StandardHeader title="Read" />
  <PdfViewer
    url={pathToPdf}
    httpHeaders={{
      authorization: `Bearer ${localStorage.getItem("account-credential")}`,
    }}
    style={"border: 1px solid black; display: block; margin-top: 10px; width:95%;"}
  />
</Page>
