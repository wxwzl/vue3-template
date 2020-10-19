import { createStore, ModuleTree } from "vuex";
const modulesFiles = require.context("./modules", true, /\.ts$/);
let modules: ModuleTree<any> = {};
modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, modules);
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: modules,
});
