import "./registerServiceWorker";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installPlugin from "@/plugins";
import elementPlus from "element-plus";
const app = createApp(App);
app.use(elementPlus);
app.use(store).use(router);
installPlugin(app);
app.mount("#app");
