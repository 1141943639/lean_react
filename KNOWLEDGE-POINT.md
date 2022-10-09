# 知识点

## 1. 使用路由

* 安装
  
  `$ npm install --save react-router-dom`

* 日常使用

  > src/index.js

  ```
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";
  import reportWebVitals from "./reportWebVitals";
  import { BrowserRouter as Router } from "react-router-dom";
  import App from './App'
  import Users from './Users'
  import Contact from './Contact'

  const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Router>
        <Route path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} />
      </Router>
    </React.StrictMode>
  );
  ```

* 代替品: 暂时没找到
* 优点: 

  支持Web和Native两种环境

  社区丰富, 有详细的文档, 配置灵活

* 缺点

  如果使用BrowserRouter的模式需要服务器配合，保证在前端路由的切换范围内，都只相应同一个html文件

### 2. 使用i18n完成多语言

* 安装

  `$ npm install react-i18next i18next --save`

* 日常使用



  > src/i18n/config.js

  ```
  import i18n from "i18next";
  import { initReactI18next } from "react-i18next";

  import translation_en from "./en.json";
  import translation_zh from "./zh.json";
  import translation_tzh from "./tzh.json";
  
  // 定义所有语言
  const resources = {
    en: {
      translation: translation_en,
    },
    zh: {
      translation: translation_zh,
    },
    tzh: {
      translation: translation_tzh,
    },
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: "en", // 默认语言
    interpolation: {
      escapeValue: false, // 是否转义字符串
    },
    fallbackLng: "en", // 如果匹配不到, 回退的语言
  });

  export default i18n;
  ```

  > src/i18n/en.json

  ```
  {
    "text": "English",
  }
  ```

  > src/index.js

  ```
  import { useTranslation } from "react-i18next";

  function App() {
    const { t } = useTranslation()

    return (
      <div>{t('text')}</div>
    )
  }

  return App
  ```

  使用插值

  语法

    * 使用values里提供的值: {{abc}}
    * 使用components里提供的值: <Abc>abc</Abc>

  > src/i18n/zh.json

  ```
  {
    instance: "账户信息: <UserName>{{username}}</UserName> <Pwd>{{pwd}}</Pwd>"
  }
  ```

  > src/App.js

  ```
  import { Link } from "react-router-dom";
  import { Trans } from "react-i18next";


  function App(props) {
    const { username } = props

    return (
      <Trans
        i18nKey="instance"
        values={{
          username,
          pwd: '12345678'
        }}
        components={{
          UserName: <Link to="/username" />,
          Pwd: <Link to="/pwd">
        }}
      ></Trans>
    )
  }

  return App
  ```

  切换语言

  > src/ChangeLanguage.js

  ```
  import { useState, useEffect } from 'react'
  import { useTranslation } from "react-i18next";

  function ChangeLanguage() {
    const [language, setLanguage] = useState('en')
    const { 1i8n } = useTranslation()

    useEffect(() => {
      1i8n.changeLanguage(language)
    }, [language])
    
    return (
      <select onChange={e => {
        const value = e.currentTarget.value

        setLanguage(value)
      }}>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    )
  }

  return ChangeLanguage
  ```