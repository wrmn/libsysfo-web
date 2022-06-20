import HomePage from "../pages/home.svelte";

//NOTE:Help
import AboutPage from "../pages/help/about.svelte";
import FaqPage from "../pages/help/faq.svelte";
import ContactPage from "../pages/help/contact.svelte";

//NOTE:Library
import LibraryIndexPage from "../pages/library/index.svelte";
import LibraryMapPage from "../pages/library/map.svelte";
import LibraryListPage from "../pages/library/list.svelte";
import LibraryDetailPage from "../pages/library/detail.svelte";

import BookIndexPage from "../pages/book/index.svelte";
import PaperIndexPage from "../pages/paper/index.svelte";
import DynamicRoutePage from "../pages/dynamic-route.svelte";

import NotFoundPage from "../pages/404.svelte";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/library/",
    component: LibraryIndexPage,
    routes: [
      {
        path: "list/",
        component: LibraryListPage,
      },
      {
        path: "map/",
        component: LibraryMapPage,
      },
      {
        path: "detail/:libraryId/",
        component: LibraryDetailPage,
      },
    ],
  },
  {
    path: "/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
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
    path: "/help/",
    routes: [
      {
        path: "faq/",
        component: FaqPage,
      },
      {
        path: "contact/",
        component: ContactPage,
      },
      {
        path: "about/",
        component: AboutPage,
      },
    ],
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
