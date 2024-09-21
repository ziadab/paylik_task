import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
// import SinglePost from "@/views/SinglePost.vue";
// import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
// import CreateEditPost from "@/views/CreateEditPost.vue";

const routes = [
  { path: "/", component: Home },
  //   { path: "/post/:id", component: SinglePost },
  //   { path: "/register", component: Register },
  { path: "/login", component: Login },
  //   { path: "/create-edit-post/:id?", component: CreateEditPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem("token") || null;
//   console.log(!isAuthenticated && to.name !== "Login");
//   if (to.name !== "Login" && !isAuthenticated) next({ path: "/login" });
//   else next();
// });

export default router;
