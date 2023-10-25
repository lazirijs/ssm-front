import { createRouter, createWebHistory } from 'vue-router';
import store from "../store/index";
import { api } from '@/plugins/axios.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../pages/help.vue')
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: () => import('../pages/contactus.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { auth: "hide" },
    component: () => import('../pages/login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: { auth: "hide" },
    component: () => import('../pages/signup.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    meta: { auth: "hide" },
    component: () => import('../pages/verify.vue')
  },
  {
    path: '/account',
    name: 'account',
    meta: { auth: "required" },
    component: () => import('../pages/account.vue')
  },
  {
    path: '/school',
    name: 'school',
    meta: { auth: "required" },
    component: () => import('../pages/school.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../pages/404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 })
    })
  }
});

router.beforeEach(async (to, from, next) => {

  var user = store.state.user;

  if (user == null) {
    const result = await api.get("/api/users/enter");
    store.commit("user", result.data);
    user = result.data;
  }
  
  if (to.meta.auth == "required") {
    !user ? next({ path: "/login" }) : next();
  } else if (to.meta.auth == "hide") {
    user ? next({ path: "/account" }) : next();
  } else {
    next();
  }
});

export default router
