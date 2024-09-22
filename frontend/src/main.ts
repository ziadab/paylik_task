import { createApp } from "vue";
import "ant-design-vue/dist/reset.css";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import Antd from "ant-design-vue";

import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Antd);
app.mount("#app");
