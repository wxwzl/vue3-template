import "./registerServiceWorker";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installPlugin from "@/plugins";

const app = createApp(App);
app.use(store).use(router);
installPlugin(app);
app.mount("#app");
