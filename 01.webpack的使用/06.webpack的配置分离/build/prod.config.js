// 通过在终端输入命令：npm install uglifyjs-webpack-plugin@1.1.1 --save-dev进行丑化插件的下载，版本号1.1.1与vue-cli2的版本一致
// 通过该插件可以丑化我们打包的js文件，以致于减小js文件的大小
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// 用终端命令：npm install --save-dev webpack-dev-server@2.9.1搭建一个本地服务器
// 使用到webpack-merge，通过终端命令：npm install webpack-merge@4.1.5 --save-dev进行安装,注意，merge的版本应该用4.1.5，否则会报错
// 导入webpack-merge
const webpackMerge = require("webpack-merge")
const baseConfig = require("./base.config.js")

module.exports = webpackMerge(baseConfig,{
    plugins:[
        // 初始化该插件，该插件用于丑化打包后的js文件，某种意义上来说就是压缩打包后的js文件
        new UglifyJsPlugin()  //开发阶段最好不要进行丑化，发布的时候可以丑化来减小文件大小
    ],
})

// module.exports = {
//     plugins:[
//         // 初始化该插件，该插件用于丑化打包后的js文件，某种意义上来说就是压缩打包后的js文件
//         new UglifyJsPlugin()  //开发阶段最好不要进行丑化，发布的时候可以丑化来减小文件大小
//     ],
// }