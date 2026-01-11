import { createWebHistory, createRouter } from "vue-router";

import Welcome from "../components/welcome.vue";

//Halaman Utama
import Layout from "../layouts/layout.vue";
import Dashboard from "../views/dashboard.vue";
import Cart from "../views/cart.vue";
import Profile from "../views/profile.vue";
import Transaction from "../views/transaction.vue";

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  {
    path: "/home/",
    name: "dasboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "dasboard-item",
        component: Dashboard,
        meta: {
          title: "Dashboard",
          titleList: "Daftar Barang",
        },
      },
      {
        path: "cart",
        name: "cart-user",
        component: Cart,
        meta: {
          title: "Cart",
          titleList: "Daftar Cart",
        },
      },
      {
        path: "transaction",
        name: "transaction-user",
        component: Transaction,
        meta: {
          title: "Transaction",
          titleList: "Transaction",
        },
      },
      {
        path: "profil",
        name: "profil-user",
        component: Profile,
        meta: {
          title: "Profile",
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
