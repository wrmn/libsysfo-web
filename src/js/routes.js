import HomePage from "../pages/home.svelte";
import AboutPage from "../pages/help/about.svelte";

//library page import
import LibraryIndexPage from "../pages/library/index.svelte";
import LibraryHomePage from "../pages/library/home.svelte";
import LibraryListPage from "../pages/library/list.svelte";
import LibraryMapPage from "../pages/library/map.svelte";

import BookIndexPage from "../pages/book/index.svelte";
import PaperIndexPage from "../pages/paper/index.svelte";


import NotFoundPage from "../pages/404.svelte";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/library/",
    component: LibraryIndexPage,
  },
  {
    path: "/library/home/",
    component: LibraryHomePage,
  },
  {
    path: "/library/list/",
    component: LibraryListPage,
  },
  {
    path: "/library/map/",
    component: LibraryMapPage,
  },

  {
    path: "/book/",
    component: BookIndexPage,
  },
  {
    path: "/paper/",
    component: PaperIndexPage,
  },

  {
    path: "/help/about/",
    component: AboutPage,
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
