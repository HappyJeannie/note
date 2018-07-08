# note
使用 node + express 完成本次项目的开发

### 一、项目初始化
```
npm init      // 初始化项目
npm install express --save    // 安装 express
npm install --save express-generator  // 安装 express 生成器
./node_modules/express-generator/bin/express-cli.js -f -e     // 当前目录不为空，强制初始化并且使用的模板引擎为 Jade
npm install           // 安装依赖
npm start             // 项目启动，打开 localhost:300
```

*******
* nrm 了解一下，其实就是切换镜像源，常用指令有 `展示镜像源列表： nrm ls`、`使用某一个镜像源：nrm use cnpm `，这里就不详细介绍了，自己用的时淘宝镜像

### 二、目录结构说明

```
|-- bin       // 启动目录
|-- public      // webpack 输出目录，express 启动后加载的文件
  |-- js
  |-- css
  |-- fonts
  |-- imgs
|-- routes       // 路由目录，根据不同页面划分
|-- src           // 源文件
  |-- imgs
  |-- js
    |-- app           // 各个页面的入口文件
      |-- index.js      
      |-- detail.js
    |-- lib           // 引入的库
    |-- moduls        // 自定义模块 
  |-- less
  |-- webpack.config.js     // webpack 配置文件
|-- views
  |-- index.ejs       // html 模版文件
|-- app.js        // 整个项目的入口文件
|-- package.json    // 包管理

```