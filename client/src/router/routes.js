const routes = [
  {
    path: "/",
    meta: { requiresAuth: true },
    component: () => import("../layouts/MainLayout.vue"),
    name: "MainLayout",
    children: [
      {
        name: "main",
        path: "",
        redirect: "/main",
      },
      {
        path: "/main",
        name: "MainPage",
        component: () => import("pages/MainPage.vue"),
      },
      {
        path: "/notify",
        name: "NotifyPage",
        component: () => import("../pages/NotifyPage.vue"),
      },
      {
        path: "/lawyers",
        name: "LawyersPage",
        component: () => import("../pages/LawyersPage.vue"),
      },
      {
        path: "/requests",
        name: "ObjectsPage",
        component: () => import("pages/RequestsPage.vue"),
      },
      {
        path: "/portfolio",
        name: "PortfolioPage",
        component: () => import("pages/PortfolioPage.vue"),
      },
      {
        path: "/requestInfo/:id",
        name: "RequestInfo",
        props: true,
        component: () => import("pages/RequestInfoPage.vue"),
      },
      {
        path: "/organizations",
        name: "OrganizationsPage",
        props: true,
        component: () => import("pages/OrganizationsPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../layouts/LoginLayout.vue"),
    name: "Auth",
    children: [
      {
        name: "AuthPage",
        path: "",
        component: () => import("pages/AuthPage.vue"),
      },
    ],
  },
  {
    path: "/profile",
    children: [
      {
        path: "",
        component: () => import("../layouts/ProfileLayout.vue"),
      },
      {
        path: "id/:id",
        component: () => import("../layouts/ProfileLayout.vue"),
      },
      {
        path: "create",
        component: () => import("../layouts/ProfileLayout.vue"),
        props: () => ({ createNewUser: true }),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
