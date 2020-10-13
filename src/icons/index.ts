import app from "@/App";
import SvgIcon from "@/components/SvgIcon/index.vue"; //svg component

app.component("svg-icon", SvgIcon);
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
requireAll(req);
