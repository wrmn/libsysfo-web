<script>
  import MainCard from "../../../components/card/mainCard.svelte";
  import { Button, Icon } from "framework7-svelte";

  export let data;
</script>

<MainCard
  mainImage={data.imagesMain
    ? data.imagesMain
    : "https://dummyimage.com/600x400/ababab/0011ff"}
>
  <span slot="name"> {data.name}</span>
  <span slot="details">
    {data.description}
    <br />
    <br />
    {data.address}
  </span>
  <span slot="action">
    <Button
      view=".view-main"
      class="elevation-12 link external"
      href="https://pustaka.unand.ac.id/"
      color="deepOrange"
      fill
      round
      raised
    >
      Website
      <Icon f7="arrow_right" />
    </Button>
  </span>
</MainCard>
