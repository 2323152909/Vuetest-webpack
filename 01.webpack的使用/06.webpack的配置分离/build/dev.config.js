// 使用到webpack-merge，通过终端命令：npm install webpack-merge@4.1.5 --save-dev进行安装,注意，merge的版本应该用4.1.5，否则会报错
// 导入webpack-merge
const webpackMerge = require("webpack-merge")
const baseConfig = require("./base.config.js")

module.exports = webpackMerge(baseConfig,{
    // 下面的属性在开发阶段需要，但是在发布的时候不需要
    devServer:{ //使用该属性，可以让我们生成一个本地服务器，当我们修改我们的代码的时候，我们不需要重新跑程序，浏览器会自动进行实时的刷新
        contentBase:'./dist', // contentBase：用于服务的文件夹目录
        inline:true,           //inline：是否需要实时进行监听
        // port:'8080'            //port：用于指定端口，默认跑在8080端口
    }
})

// module.exports = {
//     // 下面的属性在开发阶段需要，但是在发布的时候不需要
//     devServer:{ //使用该属性，可以让我们生成一个本地服务器，当我们修改我们的代码的时候，我们不需要重新跑程序，浏览器会自动进行实时的刷新
//         contentBase:'./dist', // contentBase：用于服务的文件夹目录
//         inline:true,           //inline：是否需要事实进行监听
//         // port:'8080'            //port：用于指定端口，默认跑在8080端口
//     }
// }