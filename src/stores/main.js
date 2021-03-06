import { readable, writable } from "svelte/store";

export const darkTheme = writable(false);

export const mainCards = readable([
  {
    header: "library",
    content: "temukan perpustakaan yang ada di sekitarmu",
    image: "./static/images/hero-1.svg",
    path: "/library/",
  },
  {
    header: "Book",
    content: "cari dan pinjam buku yang ingin dipelajari",
    image: "./static/images/hero-3.svg",
    path: "/book/",
  },
  {
    header: "Paper/Journal",
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
        panelClose: true,
        view: ".view-main",
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
        link: "/help/faq/",
        panelClose: true,
        view: ".view-main",
      },
      {
        name: "Contact",
        link: "/help/contact/",
        panelClose: true,
        view: ".view-main",
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
    path: "/book/list/",
  },
  {
    header: "Borrow",
    image: "./static/images/hero-8.svg",
    path: "/book/borrow/",
  },
]);

export const bookCategory = readable([
  "Adult Fiction",
  "Art, Music & Photography",
  "Biographies & Memoirs",
  "Buddhism & Hinduism",
  "Business & Investing",
  "Children",
  "Christianity",
  "Classics",
  "Comics & Graphic Novels",
  "Computers & Technology",
  "Education & Test Preparation",
  "Fiction & Literature",
  "Food, Drink & Cookbook",
  "Health, Fitness & Wellness",
  "Historical Fiction",
  "History",
  "Home & Architecture",
  "Horror & Paranormal",
  "Humor & Comedy",
  "Islam",
  "Law & Tax",
  "Manga, Manhua & Manhwa",
  "Motivation & Self-Help",
  "Mystery, Thriller & Suspense",
  "Non-fiction",
  "Parenting & Relationships",
  "Philosophy",
  "Poem & Short Story",
  "Politics, Affairs & Social Sciences",
  "Professional, Engineering & Technical",
  "Psychology",
  "Reference & Dictionary",
  "Religion & Spirituality",
  "Romance",
  "Science Fiction & Fantasy",
  "Science & Nature",
  "Sports & Outdoors",
  "Teen & Young Adult Fiction",
  "Travel",
]);

export const bookLanguage = readable([
  "Chinese",
  "English",
  "German",
  "Hindi",
  "Malayalam",
  "Tamil",
  "Telugu",
  "Indonesian",
  "Japanese",
  "Korean",
  "Malay",
  "Portuguese",
  "Spanish",
  "Thai",
]);

export const paperCards = readable([
  {
    header: "Search",
    image: "./static/images/hero-9.svg",
    path: "/paper/list/",
  },
  {
    header: "Access",
    image: "./static/images/hero-10.svg",
    path: "/paper/access/",
  },
]);

export const contactContent = readable({
  form: [
    {
      label: "Name",
      type: "text",
      variable: "name",
      placeholder: "Your Name",
      icon: "house",
    },
    {
      label: "E-mail (optional)",
      type: "email",
      variable: "email",
      placeholder: "Your E-mail",
      icon: "envelope",
    },
    {
      label: "Message",
      type: "textarea",
      variable: "message",
      placeholder: "YourMessage",
      resizeable: true,
      icon: false,
    },
  ],
  button: [
    {
      link: "mailto:moawarman@gmail.com",
      name: "envelope",
      color: "theme",
    },
    {
      link: "https://wa.me/6282288411815?text=Hallo%20saya%20ingin%20kirim%20feedback%20aplikasi%20libsysfo",
      name: "phone",
      color: "green",
    },
    {
      link: "http://m.me/100007938731159",
      name: "logo_facebook",
      color: "blue",
    },
  ],
});

export const developerContact = readable([
  {
    link: "https://github.com/wrmn",
    name: "logo_github",
    color: "theme",
  },
  {
    link: "https://www.linkedin.com/in/adityawarman/",
    name: "logo_linkedin",
    color: "lightblue",
  },
  {
    link: "https://www.facebook.com/profile.php?id=100007938731159",
    name: "logo_facebook",
    color: "blue",
  },
]);

export const faqItem = readable([
  {
    title: "Mencari perpustakaan",
    category: "Perpustakaan",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Route perpustakaan",
    category: "Perpustakaan",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Mencari buku",
    category: "Buku",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Mengajukan peminjaman buku",
    category: "Buku",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Mencari jurnal",
    category: "Jurnal",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Mengajukan permintaan akses",
    category: "Jurnal",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Cara mendaftar akun",
    category: "Akun",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
  {
    title: "Cara mengatur akun",
    category: "Akun",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi tempora praesentium similique blanditiis, ab voluptates fugit. Ut, fugiat quidem doloremque nisi, pariatur, eum natus iusto blanditiis nulla doloribus eaque rem?",
  },
]);
