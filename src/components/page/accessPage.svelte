<script>
  import { permissionResult } from "../../stores/data";
  import { isoToDmy } from "../../js/util";
  import { Badge, Button, Card, CardContent } from "framework7-svelte";
  let desc = false;
  const sortData = (field) => {
    let sortable = $permissionResult;
    sortable.sort((a, b) => {
      let fa = a[field],
        fb = b[field];
      if (desc) {
        fa = b[field];
        fb = a[field];
      }
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    permissionResult.set(sortable);
  };
</script>

<Card>
  <CardContent>
    <div class="data-table make-capital">
      {#if $permissionResult.length == 0}
        Belum mengajukan akses untuk jurnal
      {:else}
        <table width="100%">
          <thead>
            <tr>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("createdAt");
                  }}
                />
                Penagajuan
              </th>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("title");
                  }}
                />
                Judul
              </th>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("subject");
                  }}
                />
                Subject
              </th>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("purpose");
                  }}
                />
                Tujuan
              </th>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("accepted");
                  }}
                />
                Status
              </th>
              <th class="label-cell">Act</th>
            </tr>
          </thead>
          <tbody>
            {#each $permissionResult as p}
              <tr>
                <td class="label-cell"
                  >{isoToDmy(p.createdAt, "dd-mmmm-yyyy hh:MM")}</td
                >
                <td class="label-cell">{p.title}</td>
                <td class="label-cell">{p.subject}</td>
                <td class="label-cell">{p.purpose}</td>
                <td class="label-cell">
                  {#if "accepted" in p}
                    {#if p.accepted}
                      <Badge textColor="black" color="green">Accepted</Badge>
                    {:else}
                      <Badge color="red" textColor="black">Rejected</Badge>
                    {/if}
                  {:else}
                    <Badge color="yellow" textColor="black">Pending</Badge>
                  {/if}
                </td>
                <td class="label-cell">
                  {#if p.accepted}
                    <Button href={`/paper/read/${p.id}/`}>Read</Button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </CardContent>
</Card>
