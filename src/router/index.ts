import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { customRoute } from "./types";

const modulesFiles = require.context("./modules", true, /\.ts$/);
let routes: Array<customRoute> = [];
routes = modulesFiles.keys().reduce((routes, modulePath) => {
  const value = modulesFiles(modulePath);
  routes = routes.concat(value.default);
  return routes;
}, routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior: async (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.matched.every((record, i) => from.matched[i] !== record)) {
        return { left: 0, top: 0 };
      }
      return false;
    }
  },
});
export default router;
