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
npm run watch         // 代码如果有修改则重新编译打包
npm run webpack       // 打包项目
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

### 三、接口与数据库

#### 1、接口请求定义
所有的接口请求定义为： `/api/xxx`，那么所有接口请求的如下：
```
/api/notes        GET   req:{}                              // 获取所有的 note
/api/note/create  POST  req:{note:'hello world'}            // 创建一个 note
/api/note/edit    POST  req:{note:'new note',id:100}        // 修改一个 note
/api/note/delete  POST  req:{id:100}                        // 删除一个 note
```
以上接口响应的示例为：
```
// 获取所有 note 的接口
{status:0,data:[{},{}]} / {status:1,errMsg:'失败的原因'}          // 请求成功，status 为 0 ，data 返回列表数组，请求失败，status 为 1 ，并返回错误信息

// 创建一个 note / 修改一个 note / 删除一个 note
{status:0} / {status:1,errMsg:'失败的原因'} // 请求成功，status 为 0 ；请求失败，status 为 1 ，并返回错误信息
```

#### 2、数据库

数据库采用 sequelize ，可以直接在 npm 中下载，在终端中执行命令 `npm install --save swquelize` ，其中，sequelize 可选 mysql 、 sqlite 、 postgres 、 mssql ，因为 sqlite 配置简单无需用户名密码，我们选择使用 sqlite 。在终端中执行 `npm install --save sqlite3`。

```
const Sequelize = require('sequelize');         // 引入 sequelize

const sequelize = new Sequelize(undefined,undefined,undefined,{
  host:'localhost',
  dialect:'sqlite',
  storage:'../database/database.sqlite'           // 数据存储位置
})
<!--  
// 以下是用来验证数据库是否连接成功，如果成功则打印 'Connection has been established successfully.'
// 连接成功后即可删除
 sequelize                                              
   .authenticate()
   .then(() => {
     console.log('Connection has been established successfully.');
   })
   .catch(err => {
     console.error('Unable to connect to the database:', err);
   }); 
-->
  // 创建一个表 note ，其中的字段 text 的数据类型为 字符串
  const Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    }
  });
  // Note.drop()        删除表
  // force: true will drop the table if it already exists
  // 如果 force 为 true 那么如果表已经存在，那么会强制删除。默认为 false
  Note.sync({force:true}).then(() => {
    // 创建表
    Note.create({
      text: 'John'
    })
  }).then(() => {
    // 查询表中所有数据
    // 由于每一条数据有带有大量无用信息，添加查询参数(raw:true)能够筛选出 data 信息
    // {raw:true,where:{id:2}}   // 带查询参数的示例
    Note.findAll({raw:true}).then(notes => {      
      console.log(notes)
    })
  })
  // 删除某一条 text 内容为 haha 数据
  Note.destory({
    where:{
      text:'haha'
    }
  })

```
#### 3、数据库常用指令
```
Note.findAll({raw:true})                              // 获取所有数据
Note.create({text:text,uid:uid})                      // 创建一条新的数据
Note.update({text:text,uid:uid},{where:{uid:uid}})    // 更新一条新的数据
Note.destroy({where:{uid:uid}})                       // 删除一条数据
```

以上命令基本能实现增删改查的功能



### 四、node 端调试

可以全局安装 `node-inspector`，但是最新版已经支持 node 调试，可以在启动项目的时候使用命令 `node --inspect ./bin/www`

### 五、登录注册功能

### 1、passport

node 中的 passport 模块可以实现登录注册的认证。


### 其他：

#### 1、发布订阅模式
这个模式用于组件、模块之间进行解耦。
<!-- ./src/js/module/events.js 不是很明白 -->

#### 2、 width() 、 outerWidth()

```
var a = 元素本身的宽度；

width() = a；

innerWidth() = a+padding;

outerWidth() = a+padding+border;

outerWidth(true) = a+padding+border+margin;
```