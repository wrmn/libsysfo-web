import { readable, writable } from "svelte/store";

export const darkTheme = writable(false);

export const mainCards = readable([
  {
    header: "cari perpustakaan",
    content: "temukan perpustakaan yang ada di sekitarmu",
    image: "./static/images/hero-1.svg",
    path: "/library/",
  },
  {
    header: "cari Buku",
    content: "cari dan pinjam buku yang ingin dipelajari",
    image: "./static/images/hero-3.svg",
    path: "/book/",
  },
  {
    header: "cari Paper/Jurnal",
    content: "akses penelitian yang ditulis dalam jurnal",
    image: "./static/images/hero-4.svg",
    path: "/paper/",
  },
]);

export const mainMenu = readable([
  {
    name: "main",
    main: true,
    menus: [
      {
        name: "Home",
        link: "/",
        panelClose: true,
        view: ".view-main",
      },
      {
        name: "Library",
        link: "/library/",
        panelClose: true,
        view: ".view-main",
      },
      {
        name: "Book",
        link: "/book/",
        panelClose: true,
        view: ".view-main",
      },
      {
        name: "Paper",
        link: "/paper/",
        panelClose: true,
        view: ".view-main",
      },
    ],
  },
  {
    name: "Preferences",
    main: false,
    menus: [
      {
        name: "Profile",
        link: "/profile/",
        panelClose: false,
        view: true,
      },
      {
        name: "Settings",
        link: "/settings/",
        panelClose: false,
        view: true,
      },
    ],
  },

  {
    name: "Help",
    main: false,
    menus: [
      {
        name: "Frequently Asked Question",
        link: "/faq/",
        panelClose: true,
        view: ".view-main",
      },
      {
        name: "Contact",
        link: "/contact/",
        panelClose: false,
        view: true,
      },
      {
        name: "About",
        link: "/help/about/",
        panelClose: true,
        view: ".view-main",
      },
    ],
  },
]);

export const bookCards = readable([
  {
    header: "Search",
    image: "./static/images/hero-7.svg",
    path: "/library/list/",
  },
  {
    header: "Borrow",
    image: "./static/images/hero-8.svg",
    path: "/library/map/",
  },
]);

export const paperCards = readable([
  {
    header: "Search",
    image: "./static/images/hero-9.svg",
    path: "/library/list/",
  },
  {
    header: "Access",
    image: "./static/images/hero-10.svg",
    path: "/library/map/",
  },
]);
