import { customRoute } from "@router/types";
const routes: Array<customRoute> = [
  {
    path: "/",
    name: "home",
    component: (): any => import("@/views/Home.vue"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: (): any => import("@/views/error-pages/404.vue"),
    hidden: true,
  },
];
export default routes;
