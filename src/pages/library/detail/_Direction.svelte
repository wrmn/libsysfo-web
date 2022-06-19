<script>
  import { getContext } from "svelte";
  import { contextKey } from "@beyonk/svelte-mapbox";
  import {
    f7,
    Button,
    List,
    ListItem,
    AccordionContent,
  } from "framework7-svelte";
  import * as turf from "@turf/turf";
  export let dirWalking;
  export let dirDriving;
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
  
  async function directions(meth) {
    let data;
    if (meth == "driving") {
      data = await dirDriving;
    } else if (meth == "walking") {
      data = await dirWalking;
    } else {
      return;
    }

    if (!data || data.routes.length == 0) {
      f7.dialog
        .create({
          title: "",
          text: "Tidak dapat menemukan rute",
          buttons: [
            {
              text: "OK",
            },
          ],
        })
        .open();
      setTimeout(function () {
        f7.dialog.close();
      }, 3000);
      return;
    }
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
    <ListItem accordionItem title="Location">
      <AccordionContent>
        <Button fill raised on:click={() => currentLocation()}>My</Button>
        <Button fill raised on:click={() => libraryLocation()}>Library</Button>
      </AccordionContent>
    </ListItem>

    <ListItem accordionItem title="Direction">
      <AccordionContent>
        <Button fill raised on:click={() => directions("walking")}
          >walking</Button
        >
        <Button fill raised on:click={() => directions("driving")}
          >driving</Button
        >
      </AccordionContent>
    </ListItem>
  </List>
</div>

<style>
  .button-container {
    width: 40vw;
    max-width: 150px;
    padding-left: 30px;
  }
</style>
