// webpack.config.js文件名字固定，为webpack的配置文件，用来配置webpack打包的入口和出口

// 通过在终端输入npm init生成一个npm包管理的文件，package.json文件
// 通过npm install下载依赖包
const path = require("path")

module.exports = {
    // 配置webpack入口
    entry:'./src/main.js',
    // 配置webpack出口
    output:{
        // _dirname为自动生成的，是该文件webpack.config.js文件的绝对路径
        // 使用resolve方法将绝对路径和出口路径拼接起来
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
}