# React学习项目

根据ReactJs文档的练习任务完成的练手项目, 使用react+ts进行开发

该项目使用react脚手架(create-react-app)运行

已完成的功能如下

* [简单的代办事项功能](#todoList)
* [登录页面以及相关逻辑](#login)
* [支持多语言](#multiLanguage)
* [使用redux](#useRedux)
* 使用tailwind优化样式并实现响应式页面

未完成的功能

* 消息提示
* loading功能

[知识点总结](https://github.com/1141943639/lean_react/blob/master/KNOWLEDGE-POINT.md)

# 样式

样式: tailwindcss, clsx<br/>
组件: @mui/base<br/>
过渡: react-transition-group

# 接口

使用的接口来自 https://jsonplaceholder.typicode.com/

注意: 该接口不支持修改数据, 所以代办事项页面(todoList)上的数据修改都是假的, 刷新后会回复原样

# 开发环境运行项目

```
// 安装依赖
npm i

// 运行项目
npm start
```

访问http://localhost:3000进入登录页

用户名: 从 https://jsonplaceholder.typicode.com/users 接口中随便取一个数据的username

密码: 随便输入 但是需要满足规则(最小10位, 必须包括⼤⼩写和数字和特殊符号!@#$)

例如: 
用户名: Bret
密码: 124214Dsdg235325@

<h1 id="todoList">简单的代办事项功能</h1>

提供简单的增删改查功能, 会根据用户不同用户获取不一样的数据, 编辑时使用@mui/base的TextareaAutosize组件, 支持多行文本的编辑

<h1 id="login">登录页面以及相关逻辑</h1>

登录页面使用formik库制作表单, 表单校验使用的是yup
如果没有登录就无法访问其他页面

<h1 id="multiLanguage">支持多语言</h1>

使用的是i18n实现多语言功能, 点击右上角的语言选项可以切换不同语言, 目前支持英文和简体和繁体, 假如没有匹配到语⾔默认回滚到英⽂

<h1 id="useRedux">使用redux</h1>

使用redux储存用户数据, 和语言数据, 并使用redux-persist实现数据持久化管理

使用RTK query来管理接口请求