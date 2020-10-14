import { App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; //svg component

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
requireAll(req);
export default (app: App) => {
  app.component("svg-icon", SvgIcon);
};
