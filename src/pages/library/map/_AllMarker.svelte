<script>
  import * as turf from "@turf/turf";
  import Guide from "./_Guide.svelte";

  import {
    List,
    Icon,
    Row,
    Col,
    f7,
    ListItem,
    Searchbar,
    Card,
    CardHeader,
    AccordionContent,
    Button,
    CardFooter,
    Link,
  } from "framework7-svelte";
  import {
    routeResult,
    routeIndex,
    dataResult,
    guideResult,
  } from "../../../stores/data";
  import { getContext } from "svelte";
  import { contextKey } from "@beyonk/svelte-mapbox";
  import { onDestroy, onMount } from "svelte";

  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();
  const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;

  let resolveData = [];
  let mapMarker = [];
  let src = [];
  let isHide = true;
  let isCardHide = true;
  let isMarkerHide = true;
  let isGuideHide = true;
  let location;
  let srcPoint;

  // NOTE: Location
  onMount(() => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    markerData();
  });

  onDestroy(() => {
    routeResult.set([]);
    guideResult.set([]);
  });

  const locationSuccess = (position) => {
    location = true;
    src = [position.coords.longitude, position.coords.latitude];
    srcPoint = new mapbox.Marker().setLngLat(src).addTo(map);
  };

  const locationError = (error) => {
    location = false;
    f7.dialog.alert(
      "Harap izinkan Libsysfo mengakses lokasi anda untuk perutean",
      "Izin Lokasi ditolak"
    );
  };

  const handleError = (err) => {
    console.warn(err);
  };

  // NOTE: Marker
  const markerData = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/library`).catch(
      handleError
    );
    const msg = await response.json();
    msg.data.library.forEach((e) => {
      resolveData.push({
        header: "lihat perpustakaan",
        address: e.address,
        image: e.imagesMain,
        coordinate: e.coordinate,
        name: e.name,
        path: `/library/detail/${e.id}/`,
      });
    });
    isMarkerHide = false;
    resolveData.forEach((e, i) => {
      mapMarker.push(
        new mapbox.Marker().setLngLat(e.coordinate).setPopup(
          new mapbox.Popup({
            closeButton: false,
            maxWidth: "900px",
          })
            .setHTML(
              `<a href=${e.path} class='button button-fill button-round'>${e.name}</a>`
            )
            .on("open", () => {
              routeResult.set(e);
              routeIndex.set(i);
              isCardHide = false;
              isGuideHide = false;
              guideResult.set([]);
              isGuideHide = true;
            })
        )
      );
    });
    dataResult.set(resolveData);
    displayAllMarker();
  };

  const displayAllMarker = () => {
    mapMarker.forEach((e) => {
      e.addTo(map);
    });
  };

  const removeAllMarker = () => {
    mapMarker.forEach((e) => {
      e.remove();
    });
  };

  const showMarker = (data, i) => {
    isHide = true;
    isCardHide = false;
    isMarkerHide = true;
    isGuideHide = true;
    guideResult.set([]);
    removeAllMarker();
    mapMarker[i].addTo(map);
    mapMarker[i].togglePopup();
    routeResult.set(data);
    map.flyTo({
      center: data.coordinate,
      zoom: 17,
    });
  };

  // NOTE: Route
  const directions = async (meth) => {
    isMarkerHide = true;
    removeAllMarker();
    isCardHide = true;
    isGuideHide = false;
    mapMarker[$routeIndex].addTo(map);
    const dst = $routeResult.coordinate;
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
    guideResult.set(data.routes[0].legs[0].steps);
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
  };

  const gotoLoc = (coords, lvlZoom = 15) => {
    map.flyTo({
      center: coords,
      zoom: lvlZoom,
    });
  };

  const measureZoom = (distance) => {
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
  };

  const toggleMarker = () => {
    isMarkerHide = !isMarkerHide;
    if (isMarkerHide) {
      removeAllMarker();
    } else {
      displayAllMarker();
    }
  };
</script>

<div class="searchbar-container">
  <Searchbar
    class="searchbar-demo"
    searchContainer=".search-list"
    searchIn=".item-title"
    placeholder=""
    inline
    on:focus={() => {
      isHide = false;
    }}
    on:blur={() => {
      setTimeout(function () {
        isHide = true;
      }, 200);
    }}
  />
</div>

<div class:hide={isHide} class="list-container">
  <List class="searchbar-not-found">
    <ListItem title="Nothing found" />
  </List>
  <List class="search-list searchbar-found">
    {#each $dataResult as data, i}
      <ListItem
        link="#"
        title={data.name.replace(/\w\S*/g, (w) =>
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
      height:200px;
      background-size: contain;
      text-transform: capitalize;
      background-repeat: no-repeat;
      background-position: center;
    `}
      ><span style="background-color: rgba(0,0,0,.7); color:white"
        >{$routeResult.name}</span
      ></CardHeader
    >
    <CardFooter>
      <List accordionList>
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
        <ListItem>
          <Link href={$routeResult.path}>Details</Link>
        </ListItem>
      </List>
    </CardFooter>
  </Card>
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
<div class="action-container">
  <List accordionList>
    <ListItem accordionItem title="Action">
      <AccordionContent>
        <Button fill raised disabled={!location} on:click={() => gotoLoc(src)}
          >My Location</Button
        >
        <Button fill raised on:click={() => toggleMarker()}>
          Toggle Marker
        </Button>
        <Button
          fill
          raised
          on:click={() => {
            if (map.getLayer("route")) map.removeLayer("route");
            guideResult.set([]);
            isGuideHide = true;
          }}>Clear Route</Button
        >
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
    width: 200px;
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
  .action-container {
    position: absolute;
    bottom: 0;
  }

  .hide {
    visibility: hidden;
  }
</style>
