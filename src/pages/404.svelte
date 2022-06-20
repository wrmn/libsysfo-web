<script>
  import { Page, Block } from "framework7-svelte";
  import StandardHeader from "../components/standardHeader.svelte";
</script>

<Page>
  <StandardHeader title="Not Found" side />
  <Block strong>
    <p>Sorry</p>
    <p>Requested content not found.</p>
  </Block>
</Page>
