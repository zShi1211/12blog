// 引入path包
const path = require('path')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    // 指定入口文件
    entry: "./index.ts",
    mode: "production",
    // 指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包后文件的名称
        filename: "index.js"
    },
    resolve: {
        extensions: [".js", ".json", ".ts"],
        alias: {
        }
    },
    externals: [ 'pg-hstore'],
    target: "node",
    // 指定webpack打包的时候要使用的模块
    module: {
        // 指定要价在的规则
        rules: [
            {
                // test指定的是规则生效的文件,意思是，用ts-loader来处理以ts为结尾的文件
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // plugins: [new NodePolyfillPlugin()]
}