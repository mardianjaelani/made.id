import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
import DashboardLayout from "../components/Layouts/Default_Dashboard.vue";
import DefaultLayout from "../components/Layouts/DefaultLayout.vue";
import Overview from "../views/Overview.vue";
import Profile from "../views/Profile.vue";

import DashboardLayoutPatient from "../components/Layouts/Patient/Default_Dashboard_Patient.vue";
import Default_Dashboard_Guest from "../components/Layouts/Guest/Default_Dashboard_Guest.vue";

import Content from "../components/Layouts/Content.vue";

import PageNotFound from "../views/PageNotFound.vue"


Vue.use(VueRouter);

function checkAuth(to, from, resolve, reject) {
  if (store.getters.isAdminLoggedIn || store.state.admin.isLoggedIn) {
    resolve();
  } else {
    router.push({ path: "/staff/login" });
  }
}

function checkAuthPatient(to, from, resolve, reject) {
  if (store.getters.isUserLoggedIn || store.state.user.isLoggedIn || store.state.user.auth === 0) {
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
      {
        path: 'password',
        name: 'StaffChangePassword',
        component: () =>
          import("../views/staff/ChangePassword.vue"),
      },
      {
        path: "visitor",
        component: DefaultLayout,
        children: [
          {
            path: '',
            name: 'visitor',
            component: () =>
            import("../views/visitor/Visitor.vue"),
          },
          {
            path: 'create',
            name: 'CreateVisitor',
            component: () => import("../views/visitor/Create.vue"),
          },
          {
            path: 'video-stream',
            name: 'VideoStream',
            component: () => import("../views/staff/VideoChannel.vue"),
          }        
        ]
      },
      {
        path: "reservation",
        name: "Reservation",
        component: () =>
          import("../views/reservation/Reservation.vue"),
      },
      {
        path: "setting",
        name: "setting",
        component: () =>
          import("../views/Setting.vue"),
      },
      {
        path: "sales",
        name: "sales",
        component: () =>
          import("../views/Sales.vue"),
      },
      {
        path: "payment-manage",
        component: DefaultLayout,
        children: [
          {
            path: 'search-info',
            name: 'SearchInfo',
            component: () => import("../views/payment/SearchInfo.vue"),
          },
          {
            path: 'upload-info',
            name: 'UploadInfo',
            component: () => import("../views/payment/UploadInfo.vue"),
          }        
        ]
      },
      {
        path: "master",
        component: DefaultLayout,
        redirect: "/master/treatment",
        children: [
          {
            path: 'treatment',
            name: 'MasterTreatment',
            component: () =>
              import("../views/master/Treatment.vue"),
          },
          {
            path: 'medicine',
            name: 'MasterMedicine',
            component: () =>
              import("../views/master/Medicine.vue"),
          },
          {
            path: 'item',
            name: 'MasterItem',
            component: () =>
              import("../views/master/Item.vue"),
          },
          {
            path: 'salon',
            name: 'MasterSalon',
            component: () =>
              import("../views/master/Salon.vue"),
          },
        ]
      },
    ]
  },
  {
    path: "/patient",
    component: DashboardLayoutPatient,
    redirect: "/patient/dashboard",
    beforeEnter: checkAuthPatient,
    children: [
      {
        path: 'dashboard',
        name: 'DashboardPatient',
        component: () =>
          import("../views/patient/Dashboard.vue"),
      },
      {
        path: 'profile',
        name: 'ProfilePatient',
        component: () =>
          import("../views/patient/Profile.vue"),
      },
      {
        path: 'user-profile',
        name: 'UserProfilePatient',
        component: () =>
          import("../views/patient/UserProfile.vue"),
      },
      {
        path: 'prescription',
        name: 'PrescriptionPatient',
        component: () =>
          import("../views/patient/Prescription.vue"),
      },
      {
        path: 'destination',
        name: 'DestinationPatient',
        component: () =>
          import("../views/patient/Destination.vue"),
      },
      {
        path: 'video-call',
        name: 'VideoCallPatient',
        component: () =>
          import("../views/patient/VideoCall.vue"),
      },
      {
        path: 'payment',
        name: 'PaymentPatient',
        component: Content,
        children: [
          {
            path: '',
            component: () => import("../views/patient/Payment.vue"),
          },
          {
            path: 'help',
            component: () => import("../views/patient/HelpPayment.vue"),
          },
        ]
      },
        // component: () =>
        //   import("../views/patient/Payment.vue"),
      {
        path: 'password',
        name: 'UpdatePasswordPatient',
        component: () =>
          import("../views/patient/UpdatePassword.vue"),
      },
    ]
  },

  {
    path: "/booking",
    component: Default_Dashboard_Guest,
    redirect: "/booking",
    children: [
      {
        path: '',
        name: 'DashboardGuest',
        component: () =>
          import("../views/guest/Dashboard.vue"),
      },
      {
        path: 'calendar',
        name: 'CalendarGuest',
        component: () =>
          import("../views/guest/Calendar.vue"),
      },
      {
        path: 'form',
        name: 'FormGuest',
        component: () =>
          import("../views/guest/Form.vue"),
      },
      {
        path: 'info',
        name: 'InfoGuest',
        component: () =>
          import("../views/guest/Info.vue"),
      },
      {
        path: 'thank-you',
        name: 'ThankyouGuest',
        component: () =>
          import("../views/guest/Thankyou.vue"),
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
