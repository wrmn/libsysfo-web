<script>
  import { getContext } from "svelte";
  import { contextKey } from "@beyonk/svelte-mapbox";
  import { Button, List, ListItem, AccordionContent } from "framework7-svelte";
  import * as turf from "@turf/turf";
  export let dir;
  export let coords = {
    src: [0, 0],
    dst: [0, 0],
  };

  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();

  const srcPoint = new mapbox.Marker().setLngLat(coords.src).addTo(map);
  const dstPoint = new mapbox.Marker().setLngLat(coords.dst).addTo(map);
  function currentLocation() {
    map.flyTo({
      center: coords.src,
      zoom: 15,
    });
  }

  function libraryLocation() {
    map.flyTo({
      center: coords.dst,
      zoom: 15,
    });
  }

  function measureZoom(distance) {
    let init = 0.149;
    let multipler = 0.149;
    let zoom = 27.5;
    let rep = 0;
    while (distance > init) {
      init += multipler * 0.25;
      zoom -= 0.25;
      rep += 1;
      if (rep == 4) {
        rep = 0;
        multipler = init;
      }
    }
    return zoom;
  }

  async function directions() {
    // let loc = {
    //   latitude: -0.915438492909816,
    //   longitude: 100.46084726822548,
    // };
    const data = await dir;
    const route = data.routes[0].geometry.coordinates;
    const mid = turf.midpoint(turf.point(coords.src), turf.point(coords.dst))
      .geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    } else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#977560",
          "line-width": 3,
          "line-opacity": 1,
        },
      });
    }

    map.flyTo({
      center: mid,
      zoom: measureZoom(data.routes[0].distance),
    });
  }
</script>

<div class="button-container">
  <List accordionList>
    <ListItem accordionItem title="Action">
      <AccordionContent>
        <Button fill raised on:click={() => directions()}>direction</Button>
        <Button fill raised on:click={() => currentLocation()}
          >My Location</Button
        >
        <Button fill raised on:click={() => libraryLocation()}>
          Library Location
        </Button>
      </AccordionContent>
    </ListItem>
  </List>
</div>

<style>
  .button-container {
    width: 40vw;
    max-width: 250px;
    padding-left: 30px;
    background-color: rgba(0, 0, 0, 0);
  }
</style>
