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
        filename:'bundle.js',
        /*  因为打包图片时，较大的图片会被打包放在dist目录中，然而我们运行时会在index.html路径下进行图片的访问，
         *此时我们在该路径下是找不到图片的，必须到dist目录下才能找到，因此我们在这里配置publicPath对引用路径进行更改，就能找到图片了
         */

        publicPath:'dist/'
    },
    // 配置css文件加载的loader
    module: {
        rules: [
            // 加载.css文件对象的loader
            {
                //正则表达式，指以.css结尾的文件
                test: /\.css$/i,
                // css-loader只负责将css文件进行加载
                // style-loader只负责将样式添加到DOM中
                // 使用多个loader时，是从右向左读
                use: ["style-loader","css-loader"],
            },
            // 加载.less文件对象的loader
            {
                test: /\.less$/i,
                use: [
                    {
                        // 将样式加载到DOM中
                        loader: "style-loader",
                    },
                    {
                        // 将css文件进行加载
                        loader: "css-loader",
                    },
                    {
                        // 将less转换成css
                        loader: "less-loader",
                        // options对象中可以添加一些选项语法
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ],
            },
            /*
             *  注意：
             *      webpack在打包图片的时候不能将file-loader和url-loader同时配置在webpack.config.js配置文件中
             */
            // // 加载较大类型图片文件的对象loader
            // {
            //     test: /\.(png|jpe?g|gif|jpg)$/i,
            //     use: [
            //       {
            //         loader: 'file-loader',
            //         options:{
                        
            //         }
            //       },
            //     ],
            // },
            // 加载url图片文件对象，小于限制的文件对象的loader
            {
                test: /\.(pong|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        // 当加载的图片小于limit限制的大小时，使用url-loader进行图片加载，会将图片变异成base64字符串形式
                        // 当加载的图片大于limit限制时，会使用我们的file-loader进行图片的加载
                      limit: 9801,
                    //   在hash后面加入数字，可以截取hash代码的长度，（hash:8）可以将hash长度控制在8位
                    // 通过[name]可以读取到该图片本来的name
                      name: 'img/[name]_[hash:8].[ext]',
                    },
                    
                  },
                ],
            },
            // 下载babel-loader命令为：npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
            // 配置babel-loader
            // 可以将es6语法转换成es5语法，否则有的浏览器不兼容es6语法
            {
                test: /\.m?js$/,
                // exclude：排除
                // include：包含
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015']
                  }
                }
              }
        ],
    }
}