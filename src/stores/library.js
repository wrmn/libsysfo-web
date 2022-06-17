import { readable, writable } from "svelte/store";

export const current = writable("home");

export const libraryCards = readable([
  {
    header: "List",
    image: "./static/images/hero-5.svg",
    path: "/library/list/",
  },
  {
    header: "Map",
    image: "./static/images/hero-6.svg",
    path: "/library/map/",
  },
]);
