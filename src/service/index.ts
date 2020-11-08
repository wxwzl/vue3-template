//存放非响应式数据，只存放一下全局的运行时产生的数据，如果是一些在项目运行起来前的就配置好的数据，跟
//环境有关的放在相应的环境配置文件里.env.[环境]，不跟环境有关的放在.env里
//也可存放一些跟处理业务数据有关的一些全局方法，跟业务无关的一些全局方法如dom相关的操作等请写相应的uitl下，
/*
负责管理除UI之外的所有所有非响应式数据和不跟ui有关的逻辑处理层，api请求及api请求会的响应数据处理。尽量在具体的vue实例里只负责拿到数据，
再经过一个ui框架和数据之间的一个适配方法如util里的elementDataAdaptor里的方法就可以将数据渲染到页面上。
*/
import router from "@router/index";
const service = {
  signOut() {
    router.push({ name: "login" });
  },
};
export default service;
