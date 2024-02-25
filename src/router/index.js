import { createRouter, createWebHistory } from "vue-router";
import { certCookies } from "../plugins/cookies";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Update from "../views/Update.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const auth = {
  path: "/auth",
  name: "Auth",
  children: [
    {
      path: "signin",
      name: "Signin",
      component: Signin,
    },
    {
      path: "signup",
      name: "Signup",
      component: Signup,
    },
  ],
};

const dashboard = {
  path: "/",
  name: "Dashboard",
  redirect: "dashboard",
  children: [
    {
      path: "dashboard",
      name: "Welcome",
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: "dashboard/todo",
      name: "Tables",
      component: Tables,
      meta: { auth: true },
    },
    {
      path: "dashboard/todo/:id",
      name: "update",
      component: Update,
      meta: { auth: true },
    },
    {
      path: "profile",
      name: "Profile",
      component: Profile,
      meta: { auth: true },
    },
  ],
};

const routes = [dashboard, auth]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "",
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  const { id } = certCookies();
  console.log(certCookies());
  if (to.matched.some(({ meta }) => meta.auth) && !id) {
    next({ name: "Signin" });
  } else if (to.matched.some(({ path }) => path.includes("auth")) && id) {
    next({ name: "Default" });
  } else {
    next();
  }
});

export default router;
