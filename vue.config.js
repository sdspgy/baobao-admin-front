const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

    publicPath: '/' + process.env.VUE_APP_PUBLICPATH + '/',
    outputDir: process.env.VUE_APP_OUTPUTDIR,
    assetsDir: process.env.VUE_APP_ASSETSDIR,
    devServer: {
        host: '0.0.0.0',
        port: 9999,
        proxy: {
            '/baobao-admin': {
                target: 'http://127.0.0.1:11111',  // 请求本地 拦截/rbac代理到后台项目
                ws: true
            },
            '/mengshen/report': {
                target: 'http://127.0.0.1:8081',
                ws: true,//如果要代理websockets,配置这个参数
                // changeOrigin: true,//是否跨域
                // pathRewrite: {
                //     '^/report-from': ''
                // }
            }
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
    // 部署优化
    configureWebpack: {
        // 使用CDN
        // externals: {
        //     vue: 'Vue',
        //     'vue-i18n': 'VueI18n',
        //     axios: 'axios',
        //     'vue-router': 'VueRouter',
        //     vuex: 'Vuex',
        //     iview: 'iview',
        //     echarts: 'echarts',
        //     apexcharts: 'ApexCharts',
        //     'vue-apexcharts': 'VueApexCharts',
        //     xlsx: 'XLSX',
        //     dplayer: 'DPlayer',
        //     gitalk: 'Gitalk'
        // },
        // GZIP压缩
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件
                threshold: 10240 // 对超过10k文件压缩
            })
        ]
    }
}
