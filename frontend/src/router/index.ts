import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import CreateBlog from "@/views/CreateBlog.vue";
import EditBlog from "@/views/EditBlog.vue";
import ViewContent from "@/views/ViewContent.vue";
import Cookies from "js-cookie";

const routes = [
  { path: "/", component: Home, meta: { requiresAuth: true } },
  { path: "/blog/create", component: CreateBlog, meta: { requiresAuth: true } },
  { path: "/blog/:id", component: ViewContent, meta: { requiresAuth: true } },
  { path: "/blog/:id/edit", component: EditBlog, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("token") || null;
  if ((to.path === "/login" || to.path === "/register") && isAuthenticated)
    next({ path: "/" });

  if (to.meta.requiresAuth && !isAuthenticated) next({ path: "/login" });

  next();
});

export default router;
