<script>
  import {
    Page,
    Navbar,
    Toolbar,
    Link,
    Block,
    Tabs,
    Tab,
  } from "framework7-svelte";
  import { onDestroy, onMount } from "svelte";
  import { libraryResult } from "../../stores/data";

  export let f7route;

  onMount(() => {
    dataSample(f7route.params["libraryId"]);
    console.log(f7route.params["libraryId"]);
  });

  onDestroy(() => {
    libraryResult.set([]);
  });

  var handleError = function (err) {
    console.warn(err);
    libraryResult.set(err.message);

    return new Response(
      JSON.stringify({
        code: 400,
        message: "Stupid network Error",
      })
    );
  };

  const dataSample = async (id) => {
    const response = await fetch(
      `https://young-castle-31877.herokuapp.com/library/${id}`
    ).catch(handleError);
    const msg = await response.json();

    libraryResult.set(msg);
  };
</script>

<Page>
  <Navbar title="Dynamic Route" backLink="Back" />

  <Toolbar tabbar position="top">
    <Link tabLink="#tab-1" tabLinkActive>Info</Link>
    <Link tabLink="#tab-2">Gallery</Link>
    <Link tabLink="#tab-3">Location</Link>
  </Toolbar>

  <Tabs>
    <Tab id="tab-1" tabActive>
      <Block strong>
        {JSON.stringify($libraryResult)}
        <ul>
          <li><b>Url:</b> {f7route.url}</li>
          <li><b>Path:</b> {f7route.path}</li>
          <li><b>Hash:</b> {f7route.hash}</li>
          <li>
            <b>Params:</b>
            <ul>
              {#each Object.keys(f7route.params) as key}
                <li><b>{key}:</b> {f7route.params[key]}</li>
              {/each}
            </ul>
          </li>
          <li>
            <b>Query:</b>
            <ul>
              {#each Object.keys(f7route.query) as key}
                <li><b>{key}:</b> {f7route.query[key]}</li>
              {/each}
            </ul>
          </li>
          <li><b>Route:</b> {f7route.route.path}</li>
        </ul>
      </Block>
    </Tab>
    <Tab id="tab-2">
      <Block>
        <p>Tab 2 content</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim
          quia molestiae facilis laudantium voluptates obcaecati officia cum,
          sit libero commodi. Ratione illo suscipit temporibus sequi iure ad
          laboriosam accusamus?
        </p>
        <p>
          Saepe explicabo voluptas ducimus provident, doloremque quo totam
          molestias! Suscipit blanditiis eaque exercitationem praesentium
          reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod,
          qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.
        </p>
        <p>
          Totam reprehenderit amet commodi ipsum nam provident doloremque
          possimus odio itaque, est animi culpa modi consequatur reiciendis
          corporis libero laudantium sed eveniet unde delectus a maiores nihil
          dolores? Natus, perferendis.
        </p>
        <p>
          Atque quis totam repellendus omnis alias magnam corrupti, possimus
          aspernatur perspiciatis quae provident consequatur minima doloremque
          blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis
          similique iusto, repellat sed quisquam!
        </p>
        <p>
          Suscipit, facere quasi atque totam. Repudiandae facilis at optio
          atque, rem nam, natus ratione cum enim voluptatem suscipit veniam!
          Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid
          impedit! Adipisci!
        </p>
        <p>
          Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae
          consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a
          assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum
          cumque impedit.
        </p>
        <p>
          Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem,
          natus ad praesentium rerum libero consectetur temporibus cupiditate
          atque aspernatur, eaque provident eligendi quaerat ea soluta
          doloremque. Iure fugit, minima facere.
        </p>
      </Block>
    </Tab>
    <Tab id="tab-3">
      <Block>
        <p>Tab 3 content</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim
          quia molestiae facilis laudantium voluptates obcaecati officia cum,
          sit libero commodi. Ratione illo suscipit temporibus sequi iure ad
          laboriosam accusamus?
        </p>
        <p>
          Saepe explicabo voluptas ducimus provident, doloremque quo totam
          molestias! Suscipit blanditiis eaque exercitationem praesentium
          reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod,
          qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.
        </p>
        <p>
          Totam reprehenderit amet commodi ipsum nam provident doloremque
          possimus odio itaque, est animi culpa modi consequatur reiciendis
          corporis libero laudantium sed eveniet unde delectus a maiores nihil
          dolores? Natus, perferendis.
        </p>
        <p>
          Atque quis totam repellendus omnis alias magnam corrupti, possimus
          aspernatur perspiciatis quae provident consequatur minima doloremque
          blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis
          similique iusto, repellat sed quisquam!
        </p>
        <p>
          Suscipit, facere quasi atque totam. Repudiandae facilis at optio
          atque, rem nam, natus ratione cum enim voluptatem suscipit veniam!
          Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid
          impedit! Adipisci!
        </p>
        <p>
          Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae
          consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a
          assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum
          cumque impedit.
        </p>
        <p>
          Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem,
          natus ad praesentium rerum libero consectetur temporibus cupiditate
          atque aspernatur, eaque provident eligendi quaerat ea soluta
          doloremque. Iure fugit, minima facere.
        </p>
      </Block>
    </Tab>
  </Tabs>
</Page>
