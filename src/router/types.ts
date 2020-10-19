import { _RouteRecordBase } from "vue-router";
export interface customRoute extends _RouteRecordBase {
  component: any;
  hidden?: boolean; //该路由是否在菜单内显示
  topProgress?: boolean; //是否开启顶部页面加载进度条
}

declare const _default: {
  customRoute: customRoute;
};
export default _default;
