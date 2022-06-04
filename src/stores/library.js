import { readable } from "svelte/store";

export const menus = readable([
  {
    tablink: "view-home",
    icon: "house_fill",
    iconMd: "home",
    text: "Home",
    url: "/library/home/",
    active: true,
  },
  {
    tablink: "view-list",
    icon: "square_list_fill",
    iconMd: "view_list",
    text: "List",
    url: "/library/list/",
    active: false,
  },
  {
    tablink: "view-map",
    icon: "map",
    iconMd: "map",
    text: "Map",
    url: "/library/map/",
    active: false,
  },
]);
