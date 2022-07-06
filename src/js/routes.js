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

// NOTE: Profile
import ProfileIndexPage from "../pages/profile/index.svelte";
import SettingsPage from "../pages/settings.svelte";
import ProfileSettingsPage from "../pages/profile/settings.svelte";

// NOTE: Book
import BookIndexPage from "../pages/book/index.svelte";
import BookListPage from "../pages/book/list.svelte";
import BookDetailPage from "../pages/book/detail.svelte";
import BookBorrowPage from "../pages/book/borrow.svelte";
// NOTE: Paper
import PaperIndexPage from "../pages/paper/index.svelte";
import PaperListPage from "../pages/paper/list.svelte";
import PaperAccessPage from "../pages/paper/access.svelte";
import PaperDetailPage from "../pages/paper/detail.svelte";

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
    routes: [
      {
        path: "list/",
        component: BookListPage,
      },
      {
        path: "borrow/",
        component: BookBorrowPage,
      },
      {
        path: "detail/:slug/",
        component: BookDetailPage,
      },
    ],
  },
  {
    path: "/paper/",
    component: PaperIndexPage,
    routes: [
      {
        path: "list/",
        component: PaperListPage,
      },
      {
        path: "access/",
        component: PaperAccessPage,
      },
      {
        path: "detail/:paperId/",
        component: PaperDetailPage,
      },
    ],
  },
  {
    path: "/profile/",
    component: ProfileIndexPage,
    routes: [
      {
        path: "settings/",
        component: ProfileSettingsPage,
      },
    ],
  },
  {
    path: "/settings/",
    component: SettingsPage,
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
