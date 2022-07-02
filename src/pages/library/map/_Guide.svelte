<script>
  import { List, ListItem} from "framework7-svelte";
  import { guideResult } from "../../../stores/data";

  const distanceMeasure = (distance) =>
    distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(2)} Km`;

  const iconData = (inst) => {
    let icon = "house";
    switch (true) {
      case /turn left/gim.test(inst):
        icon = "arrow_turn_up_left";
        break;
      case /turn right/gim.test(inst):
        icon = "arrow_turn_up_right";
        break;
      case /bear left|keep left/gim.test(inst):
        icon = "arrow_up_left";
        break;
      case /bear right|keep right/gim.test(inst):
        icon = "arrow_up_right";
        break;
      case /roundabout/gim.test(inst):
        icon = "arrow_2_circlepath";
        break;
      case /keep|stay/gim.test(inst):
        icon = "arrow_up";
        break;
      case /destination/gim.test(inst):
        icon = "map_pin_ellipse";
        break;
      default:
        break;
    }
    return icon;
  };
</script>
<List mediaList>
  {#each $guideResult as data}
    <ListItem
      text={data.maneuver.instruction}
      title={distanceMeasure(data.distance)}
    >
      <i class="icon f7-icons" slot="media" style=""
        >{iconData(data.maneuver.instruction)}</i
      >
    </ListItem>
  {/each}
</List>
