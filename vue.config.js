/* eslint-disable */
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const path = require("path");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
function resolve(str) {
  return path.resolve(__dirname, str);
}
module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: process.env.VUE_APP_STATIC_PATH || "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  configureWebpack: (config) => {
    config.externals = {
      // vue: "Vue",
      // "element-ui": "ELEMENT",
      // "vue-router": "VueRouter",
      // vuex: "Vuex",
      // axios: "axios"
    };
  },
  chainWebpack(config) {
    // 修复HMR
    config.resolve.symlinks(true);

    /** 处理svg 图片 打包svg图片为雪碧图*/
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);

    config.resolve.alias
      // .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"))
      .set("@assets", resolve("src/assets"))
      .set("@images", resolve("src/assets/images"))
      .set("@router", resolve("src/router"))
      .set("@mixins", resolve("src/mixins"));
    if (IS_PROD) {
      //配置混淆压缩，去除console.log；vue-cli内置TerserPlugin压缩，而且UglifyJsPlugin不能处理es6
      // config.plugin("minify").use(UglifyJsPlugin,[{
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_console: true,
      //       drop_debugger: false,
      //       pure_funcs: ["console.log"], //移除console
      //     },
      //   },
      //   sourceMap: false,
      //   parallel: true,
      // }]);
      //设置gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
      config.plugin("gzip").use(CompressionWebpackPlugin,[{
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
      }]);
      //添加打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    } else {
      // 开发环境, sourcemap不包含列信息
      // 参考：https://webpack.js.org/configuration/devtool/#development
      config.devtool("cheap-source-map");
    }

    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: [
        // "//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"
      ],
      js: [
        // "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
        // "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
        // "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
        // "//unpkg.com/axios@0.19.0/dist/axios.min.js",
        // "//unpkg.com/element-ui@2.10.1/lib/index.js",
      ],
    };

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // html中添加cdn
      args[0].cdn = cdn;
      args[0].title = process.env.appName;
      return args;
    });
    config.plugin("copy").tap((args) => {
      args[0].push({
        from: resolve(process.env.VUE_APP_STATIC_PATH),
        to: resolve(
          process.env.outputDir + "/" + process.env.VUE_APP_STATIC_PATH
        ),
        ignore: [".*"],
      });
      return args;
    });
  },
};
