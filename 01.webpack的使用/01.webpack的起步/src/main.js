// 1.使用commonJS模块化规范导入
const {add,mul} = require("./mathUtils.js")
console.log(add(10,20));
console.log(mul(10,20));

// 2.使用ES6模块化规范导入
import * as info from './info.js';

console.log(info.name);
console.log(info.age);
console.log(info.height);

// 打包方式为：在终端使用命令：webpack ./src/main.js ./dist/bundle.js