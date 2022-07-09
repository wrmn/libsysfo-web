<script>
  import { Badge, Button, Card, CardContent } from "framework7-svelte";
  import { borrowResult } from "../../stores/data";
  import { isoToDmy } from "../../js/util";

  let desc = false;
  const sortData = (field) => {
    let sortable = $borrowResult;
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

    borrowResult.set(sortable);
  };
</script>

<Card>
  <CardContent>
    <div class="data-table make-capital">
      {#if $borrowResult.length == 0}
        Belum mengajukan peminjaman
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
                    sortData("takedAt");
                  }}
                />
                Pengambilan
              </th>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("returnedAt");
                  }}
                />
                Pengembalian
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
                    sortData("serialNumber");
                  }}
                />
                Serial Number
              </th>
              <th class="label-cell">
                <Button
                  iconF7="arrow_up_arrow_down"
                  on:click={() => {
                    desc = !desc;
                    sortData("libraryName");
                  }}
                />
                Perpustakaan
              </th>
            </tr>
          </thead>
          <tbody>
            {#each $borrowResult as p}
              <tr>
                <td class="label-cell">
                  {@html isoToDmy(p.createdAt, "hh:MM <br> dd mmmm yyyy")}
                </td>
                <td class="label-cell">
                  {@html isoToDmy(p.takedAt, "hh:MM <br> dd mmmm yyyy")}
                </td>
                <td class="label-cell">
                  {@html isoToDmy(p.returnedAt, "hh:MM <br> dd mmmm yyyy")}
                </td>
                <td class="label-cell">
                  {p.title}
                </td>
                <td class="label-cell">
                  {p.serialNumber}
                </td>
                <td class="label-cell">
                  {p.libraryName}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </CardContent>
</Card>
