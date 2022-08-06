<script>
  import { getContext, onMount } from "svelte";
  import { contextKey } from "@beyonk/svelte-mapbox";
  import {
    f7,
    Button,
    Row,
    Col,
    Icon,
    List,
    ListItem,
    AccordionContent,
  } from "framework7-svelte";
  import { guideResult } from "../../../stores/data";
  import Guide from "../map/_Guide.svelte";

  import * as turf from "@turf/turf";
  export let coords = {
    src: [0, 0],
    dst: [0, 0],
  };
  export let location = true;

  let isGuideHide = true;

  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();

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
  onMount(() => {
    setTimeout(function () {
      const srcPoint = new mapbox.Marker({ color: "#977560" })
        .setPopup(
          new mapbox.Popup().setHTML(
            "<h1 style='color:black'>You are here!</h1>"
          )
        )
        .setLngLat(coords.src)
        .addTo(map);
      const dstPoint = new mapbox.Marker().setLngLat(coords.dst).addTo(map);
    }, 2000);
  });

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

  var handleError = function (err) {
    f7.dialog.alert(err, "Server timeout");
    console.warn(err);
  };

  async function getDirection(meth) {
    // NOTE: change this line for custom location
    // loc.src = [80.46084726822548, -0.915438492909816];

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${meth}/${coords.src[0]},${
        coords.src[1]
      };${coords.dst[0]},${
        coords.dst[1]
      }?steps=true&geometries=geojson&access_token=${
        import.meta.env.VITE_MAPBOX_KEY
      }`,
      { method: "GET" }
    ).catch(handleError);

    if (query.status != 200) {
      return false;
    }
    return await query.json();
  }

  async function directions(meth) {
    let data = await getDirection(meth);

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
    guideResult.set(data.routes[0].legs[0].steps);
    isGuideHide = false;
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
        <Button
          fill
          raised
          disabled={!location}
          on:click={() => currentLocation()}>My</Button
        >
        <Button fill raised on:click={() => libraryLocation()}>Library</Button>
      </AccordionContent>
    </ListItem>

    <ListItem accordionItem title="Direction" disabled={!location}>
      <AccordionContent>
        <Button
          fill
          raised
          on:click={() => directions("walking")}
          disabled={!location}>walking</Button
        >
        <Button
          fill
          raised
          on:click={() => directions("driving")}
          disabled={!location}>driving</Button
        >
      </AccordionContent>
    </ListItem>
  </List>
</div>
<div class="guide-container the-action" class:hide={isGuideHide}>
  <Row>
    <Col width="80">
      <Button
        fill
        raised
        on:click={() => {
          guideResult.set($guideResult.slice(1, $guideResult.length));
        }}
      >
        <Icon f7="checkmark" />
      </Button>
    </Col>
    <Col width="20">
      <Button
        fill
        raised
        on:click={() => {
          guideResult.set([]);
          isGuideHide = true;
        }}
      >
        <Icon f7="xmark" />
      </Button>
    </Col>
  </Row>
</div>
<div class:hide={isGuideHide} class="guide-container the-guide">
  <Guide />
</div>

<style>
  .button-container {
    width: 40vw;
    max-width: 150px;
    padding-left: 30px;
  }

  .guide-container {
    position: absolute;
    right: 10px;
    height: 100px;
    width: 300px;
    overflow: auto;
  }

  .the-action {
    bottom: 50px;
  }

  .the-guide {
    bottom: 10px;
  }

  .hide {
    visibility: hidden;
  }
</style>
