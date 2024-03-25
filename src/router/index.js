import { createRouter, createWebHistory } from 'vue-router';
import store from "../store/index";
import api from '@/plugins/axios.js';

const routes = [
  {
    path: '/home',
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
    path: '/',
    alias: '/account',
    name: 'account',
    meta: { auth: "required" },
    component: () => import('../pages/account.vue')
  },
  {
    path: '/school/:code',
    name: 'school',
    meta: { auth: "required" },
    component: () => import('../pages/school.vue'),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../components/school/dashboard.vue")
      },
      {
        path: "students",
        name: "students",
        component: () => import("../components/school/students.vue")
      },
      {
        path: "students/new",
        name: "new student",
        component: () => import("../components/school/student.vue")
      },
      {
        path: "students/:student",
        name: "student",
        component: () => import("../components/school/student.vue")
      },
      {
        path: "courses",
        name: "courses",
        component: () => import("../components/school/courses.vue")
      },
      {
        path: "courses/new",
        name: "new course",
        component: () => import("../components/school/course.vue")
      },
      {
        path: "courses/:course",
        name: "course",
        component: () => import("../components/school/course.vue")
      },
      {
        path: "timetable",
        name: "timetable",
        component: () => import("../components/school/timetable.vue")
      },
      {
        path: "timetable/new",
        name: "new timetable",
        component: () => import("../components/school/newtimetable.vue")
      },
      {
        path: "finance",
        name: "finance",
        component: () => import("../components/school/finance.vue")
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("../components/school/settings.vue")
      },
    ],
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
    store.commit("set", {key: "user", value: result.data});
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

export default router;