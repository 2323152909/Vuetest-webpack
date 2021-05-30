// webpack.config.js文件名字固定，为webpack的配置文件，用来配置webpack打包的入口和出口

// 通过命令：npm install vue --save导入vue框架
// 通过在终端输入npm init生成一个npm包管理的文件，package.json文件
// 通过npm install下载依赖包
// 通过require来获取到文件路径包，回到node_modules目录下去寻找path进行导入
const path = require("path")
// 通过require来导入webpack包，就会到node_modules目录下去寻找webpack进行导入
const webpack = require("webpack")
// 通过require来导入刚刚安装的html-webpack-plugin插件
//      注意：html-webpack-plugin的版本应该控制在3.2.0版本，否则会报错
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 通过在终端输入命令：npm install uglifyjs-webpack-plugin@1.1.1 --save-dev进行丑化插件的下载，版本号1.1.1与vue-cli2的版本一致
// 通过该插件可以丑化我们打包的js文件，以致于减小js文件的大小
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// 用终端命令：npm install --save-dev webpack-dev-server@2.9.1搭建一个本地服务器


module.exports = {
    // 配置webpack入口
    entry:'./src/main.js',
    // 配置webpack出口
    output:{
        // _dirname为自动生成的，是该文件webpack.config.js文件的绝对路径
        // 使用resolve方法将绝对路径和出口路径拼接起来
        path:path.resolve(__dirname,'../dist'),
        filename:'bundle.js',
        /*  因为打包图片时，较大的图片会被打包放在dist目录中，然而我们运行时会在index.html路径下进行图片的访问，
         *此时我们在该路径下是找不到图片的，必须到dist目录下才能找到，因此我们在这里配置publicPath对引用路径进行更改，就能找到图片了
         */
        // 我们将在dist目录下创建index.html，所以不用再在这里配置路径
        // publicPath:'dist/'
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
              },
            //   配置vue-lodaer的加载，注意：vue-loader15版本以上的需要使用插件
            {
                test:/\.vue$/i,
                use:['vue-loader']
            }
        ],
    },
    resolve:{
        // alias：别名
        // 使用extensions可以将数组中存在的这些后缀在引用的时候省略
        extensions:['.js','.css','.vue'],
        alias:{
            // 自己指定一个文件夹中的文件，不使用默认的，默认的为vue/dist/vue.runtime.js文件，不支持template模板的使用
            "vue$":"vue/dist/vue.esm.js"
        }
    },
    plugins:[
        new webpack.BannerPlugin("最终版权归廖浩东所有！"),
        // 通过DOS命令：npm install html-webpack-plugin --save-dev来安装HTMLWebpackPlugin插件
        // 该插件可以打包一个html文件到dist文件夹中
        new HtmlWebpackPlugin({
            // 插入一个模板，引用我们之前编写的index.html文件
            template:'index.html'
        }),
        // 初始化该插件，该插件用于丑化打包后的js文件，某种意义上来说就是压缩打包后的js文件
        // new UglifyJsPlugin()  //开发阶段最好不要进行丑化，发布的时候可以丑化来减小文件大小
    ],
    // 下面的属性在开发阶段需要，但是在发布的时候不需要
    // devServer:{ //使用该属性，可以让我们生成一个本地服务器，当我们修改我们的代码的时候，我们不需要重新跑程序，浏览器会自动进行实时的刷新
    //     contentBase:'./dist', // contentBase：用于服务的文件夹目录
    //     inline:true,           //inline：是否需要事实进行监听
    //     // port:'8080'            //port：用于指定端口，默认跑在8080端口
    // }
}