function add(num1,num2){
    return num1 + num2
}

function mul(num1,num2){
    return num1 * num2
}

// 1.使用commonJS模块规范化导出
module.exports = {
    add,mul
}