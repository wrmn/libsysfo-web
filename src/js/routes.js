import HomePage from "../pages/home.svelte";
import AboutPage from "../pages/help/about.svelte";

//library page import
import LibraryIndexPage from "../pages/library/index.svelte";
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
        path: ":libraryId/",
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
    path: "/help/about/",
    component: AboutPage,
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
