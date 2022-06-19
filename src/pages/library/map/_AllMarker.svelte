<script>
  import {
    List,
    ListItem,
    Searchbar,
    Card,
    CardHeader,
    AccordionContent,
    Button,
    CardFooter,
    Link,
  } from "framework7-svelte";
  import { getContext } from "svelte";
  import { contextKey } from "@beyonk/svelte-mapbox";
  import { routeResult } from "../../../stores/data";
  import { onDestroy, onMount } from "svelte";
  import * as turf from "@turf/turf";

  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();

  const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;
  export let displayData = [];
  let mapMarker = [];
  let src = [];
  let isHide = true;
  let isCardHide = true;
  let isMarkerHide = true;
  let srcPoint;

  onMount(() => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    allMarker();
    setTimeout(displayAllMarker(), 1000);
  });

  onDestroy(() => {
    routeResult.set([]);
  });

  function locationSuccess(position) {
    src = [position.coords.longitude, position.coords.latitude];
    srcPoint = new mapbox.Marker().setLngLat(src).addTo(map);
  }

  function locationError(error) {
    const message = error.message;
    alert(message);
  }

  var handleError = function (err) {
    console.warn(err);
  };

  function allMarker() {
    isMarkerHide = false;
    displayData.forEach((e) => {
      mapMarker.push(
        new mapbox.Marker()
          .setLngLat([e.coordinate.longitude, e.coordinate.latitude])
          .setPopup(
            new mapbox.Popup({
              closeButton: false,
              maxWidth: "900px",
            })
              .setHTML(
                `<a class='button button-fill button-round'>${e.content}</a>`
              )
              .on("open", () => {
                routeResult.set(e);
                isCardHide = false;
              })
          )
      );
    });
  }

  function toggleMarker() {
    isMarkerHide = !isMarkerHide;
    if (isMarkerHide) {
      removeAllMarker();
    } else {
      displayAllMarker();
    }
  }

  function displayAllMarker() {
    mapMarker.forEach((e) => {
      e.addTo(map);
    });
  }

  function removeAllMarker() {
    mapMarker.forEach((e) => {
      e.remove();
    });
  }

  map.on("click", () => {
    isHide = true;
    if (isMarkerHide) {
      toggleMarker();
    }
  });

  function toggleVisibility() {
    isHide = !isHide;
  }

  const showMarker = (data, i) => {
    isHide = true;
    isCardHide = false;
    isMarkerHide = true;
    removeAllMarker();
    mapMarker[i].addTo(map);
    mapMarker[i].togglePopup();
    routeResult.set(data);
    console.log($routeResult);
    map.flyTo({
      center: [data.coordinate.longitude, data.coordinate.latitude],
      zoom: 17,
    });
  };

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

  async function directions(meth, dst) {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${meth}/${src[0]},${src[1]};${dst[0]},${dst[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`,
      { method: "GET" }
    ).catch(handleError);

    const data = await response.json();

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
    const mid = turf.midpoint(turf.point(src), turf.point(dst)).geometry
      .coordinates;
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

    gotoLoc(mid, measureZoom(data.routes[0].distance));
  }

  function gotoLoc(coords, lvlZoom = 15) {
    map.flyTo({
      center: coords,
      zoom: lvlZoom,
    });
  }

  function removeRoute() {
    if (map.getLayer("route")) map.removeLayer("route");
  }
</script>

<div class="searchbar-container">
  <Searchbar
    class="searchbar-demo"
    searchContainer=".search-list"
    searchIn=".item-title"
    placeholder=""
    inline
    on:focus={toggleVisibility}
  />
</div>

<div class:hide={isHide} class="list-container">
  <List class="searchbar-not-found">
    <ListItem title="Nothing found" />
  </List>
  <List class="search-list searchbar-found">
    {#each displayData as data, i}
      <ListItem
        link="#"
        title={data.content.replace(/\w\S*/g, (w) =>
          w.replace(/^\w/, (c) => c.toUpperCase())
        )}
        on:click={() => showMarker(data, i)}
      />
    {/each}
  </List>
</div>
<div class:hide={isCardHide} class="card-container">
  <Card class="demo-card-header-pic">
    <CardHeader
      class="no-border"
      valign="bottom"
      style={`
      background-image: url(${$routeResult.image});
      height:100px;
      background-size: contain;
      text-transform: capitalize;
      background-repeat: no-repeat;
      background-position: center;
    `}
      ><span style="background-color: rgba(0,0,0,.7); color:white"
        >{$routeResult.content}</span
      ></CardHeader
    >
    <CardFooter>
      <Link href={$routeResult.path}>Details</Link>
      <List accordionList>
        <ListItem accordionItem title="Direction">
          <AccordionContent>
            <Button
              fill
              raised
              on:click={() =>
                directions("walking", [
                  $routeResult.coordinate.longitude,
                  $routeResult.coordinate.latitude,
                ])}>walking</Button
            >
            <Button
              fill
              raised
              on:click={() =>
                directions("driving", [
                  $routeResult.coordinate.longitude,
                  $routeResult.coordinate.latitude,
                ])}>driving</Button
            >
          </AccordionContent>
        </ListItem>
      </List>
      <!-- <Link>Direction</Link>
      <Link>Direction</Link> -->
    </CardFooter>
  </Card>
</div>

<div class="action-container">
  <List accordionList>
    <ListItem accordionItem title="Action">
      <AccordionContent>
        <Button fill raised on:click={() => gotoLoc(src)}>My Location</Button>
        <Button fill raised on:click={() => toggleMarker()}>
          Toggle Marker
        </Button>
        <Button fill raised on:click={() => removeRoute()}>Clear Route</Button>
      </AccordionContent>
    </ListItem>
  </List>
</div>

<style>
  .searchbar-container {
    width: 40vw;
    max-width: 300px;
  }

  .list-container {
    width: 40vw;
    max-width: 600px;
    padding-left: 30px;
    margin-top: -30px;
    height: 300px;
    position: absolute;
    overflow: auto;
  }

  .card-container {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
  }

  .action-container {
    position: absolute;
    bottom: 0;
  }

  .hide {
    visibility: hidden;
  }
</style>
