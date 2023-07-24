import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
import DashboardLayout from "../components/Layouts/Default_Dashboard.vue";
import DefaultLayout from "../components/Layouts/DefaultLayout.vue";
import Overview from "../views/Overview.vue";
import Profile from "../views/Profile.vue";

import Content from "../components/Layouts/Content.vue";

import PageNotFound from "../views/PageNotFound.vue"


Vue.use(VueRouter);

function checkAuth(to, from, resolve, reject) {
  if (store.getters.isUserLoggedIn || store.state.user.isLoggedIn) {
    resolve();
  } else {
    router.push({ path: "/" });
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/password/reset",
    name: "ForgetPassword",
    component: () =>
          import("../views/auth/ForgetPassword.vue"),
  },
  {
    path: "/password_reset",
    name: "PasswordReset",
    component: () =>
          import("../views/auth/PasswordReset.vue"),
  },
  {
    path: "/password/init",
    name: "InitPassword",
    component: () =>
          import("../views/auth/InitPassword.vue"),
  },
  {
    path: "/init_set_password",
    name: "PasswordReset",
    component: () =>
          import("../views/auth/InitSetPassword.vue"),
  },
  {
    path: "/staff/login",
    name: "LoginAdmin",
    component: () =>
          import("../views/auth/LoginAdmin.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/staff",
    component: DashboardLayout,
    redirect: "/staff/dashboard",
    beforeEnter: checkAuth,
    children: [
      {
        path: 'dashboard',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
    ]
  },

  { path: "*", 
    component: DefaultLayout,
    redirect: "/PageNotFound",
    children: [
      {
        path: 'PageNotFound',
        name: 'PageNotFound',
        component: PageNotFound
      }
    ]
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let programmatic = false
;(['push', 'replace', 'go', 'back', 'forward']).forEach(methodName => {
  const method = router[methodName]
  router[methodName] = (...args) => {
    programmatic = true
    method.apply(router, args)
  }
})

router.beforeEach((to, from, next) => {
  // name is null for initial load or page reload
  if (from.name === null || programmatic) {
    // triggered bu router.push/go/... call
    // route as usual
    next()
  } else {
    // triggered by user back/forward 
    // do not route
    next(false)
  }
  programmatic = false // clear flag
})

export default router;
