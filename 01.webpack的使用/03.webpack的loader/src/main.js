// 1.使用commonJS模块化规范导入
const {add,mul} = require("./js/mathUtils.js")
console.log(add(10,20));
console.log(mul(10,20));

// 2.使用ES6模块化规范导入
import * as info from './js/info.js';

console.log(info.name);
console.log(info.age);
console.log(info.height);

// 3.依赖css文件(用来导入css文件)
require("./css/normal.css")

// 4.依赖less文件(用来导入less文件)
require("./css/special.less")
// 直接通过js入口文件想文档写入内容，writeln可以在写完后自动换行
document.writeln("<p>你好呀，webpack</p>")