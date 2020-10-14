
import DB from "@/dataBase/index";
import {App} from "vue";
import svgInstall from "@/icons";
export default (app:App)=>{
    app.config.globalProperties.$db = DB;
    svgInstall(app);
};
