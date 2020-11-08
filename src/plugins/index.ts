
import service from "@/service/index";
import {App} from "vue";
import svgInstall from "@/icons";
export default (app:App)=>{
    app.config.globalProperties.$service = service;
    svgInstall(app);
};
