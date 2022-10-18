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
    // 简体
    zh: {
      translation: translation_zh,
    },
    // 繁体
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
    instance: "账户信息: <1>{{username}}</1> <2>{{pwd}}</2>"
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
        components={[<Link to="/username" />, <Link to="/pwd">]}
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

* 代替品 

  [formatjs](https://github.com/formatjs/formatjs)

* 优点

  基于i18next不仅限于react，学一次就可以用在其它地方

  适合服务端的渲染  

  支持react和react-native

* 缺点: 

  如果支持的语言太多, 改起来很麻烦

### 3. 表单([formik](https://formik.org/docs/overview) + [yup](https://github.com/jquense/yup))

* 安装
  
  formik

  `$ npm install formik --save`

  yup

  `$ npm install yup --save`

* 日常使用
  
  表单配置Yup校验

  ```
  import * as Yup from "yup";
  import { Formik } from "formik";

  <Formik
    // 默认值
    initialValues={{ username: "", pwd: "" }}
    // 校验
    validationSchema={Yup.object({
      username: Yup.string()
        // 必填
        .required('用户名必填')
        // 最小值
        .min(10, '最少输入10位')
        // 自定义校验
        .test(
          // 名称
          "format",
          // 错误信息
          '校验失败',
          // 自定义校验方法
          (value) => {
            if (/[@!#$~%^}&*()+\-={}[\]:";'<>,.?/|\\]+/g.test(value || ""))
              return false;
            return true;
          }
        ),
      pwd: Yup.string()
        .required('密码必填')
        .min(10, '最少输入10位')
        // 正则匹配校验
        .matches(/[a-z]+/g, '密码格式不正确')
        .matches(/[A-Z]+/g, '密码格式不正确')
        .matches(/[0-9]+/g, '密码格式不正确')
        .matches(/[!@#$]+/g, '密码格式不正确'),
    })}
    // 提交方法
    onSubmit={async (values) => {
      handleSignin(values);
    }}
  >...</Formik>
  ```

  字段组件的使用

  ```
  import { Formik, Field, Form, ErrorMessage } from "formik";  
  
  <Formik ...>
    // 传入方法, 获取表单相关的数据
    {(form) => {
      return (
        <Form>
          <label>
            用户名
          </label>
          <Field
            type="text"
            name="username"
          />
          <div>
            <ErrorMessage name={name} />
          </div>

          <div>
            <button
              type="submit"
            >
              登录
            </button>
          </div>
        </Form>
      );
    }}
  </Formik>
  ```
* 代替品: 

  * [redux-form](https://redux-form.com/8.2.2/docs/gettingstarted.md/)
  * [react-jsonschema-form¶](https://react-jsonschema-form.readthedocs.io/en/latest/)
  * [unform](https://unform-rocketseat.vercel.app/quick-start/)

* 优点: 

  提供针对表单的状态管理, 同时可以更加方便的进行表单校验

  yup的使用可以让表单校验变得更加简洁

### 4. Redux

* 安装 

  `$ npm install @reduxjs/toolkit`
  `$ npm install react-redux`

* 日常使用

  1.创建切片

  > src/slice.js

  ```
  import { createSlice } from '@reduxjs/toolkit'

  export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      value: 0
    },
    reducers: {
      increment: state => {
        state.value += 1
      },
      decrement: state => {
        state.value -= 1
      },
      incrementByAmount: (state, action) => {
        state.value += action.payload
      }
    }
  })

  export const { increment, decrement, incrementByAmount } = counterSlice.actions

  export default counterSlice.reducer
  export const selectCounter = state => state.counter.value
  ```
  
  添加到redux

  > src/store.js

  ```
  import { combineReducers } from "redux";
  import { configureStore } from "@reduxjs/toolkit";

  import counter from './slice.js

  const reducer = {
    counter
  };

  const store = configureStore({
    reducer: reducer,
  });

  export default store;
  ```

  注册到react

  > src/index.js

  ```
  import React from 'react'
  import ReactDOM from 'react-dom'
  import App from './App'
  import store from './app/store'
  import { Provider } from 'react-redux'

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
  ```

  在react上使用

  > src/App.js

  ```
  import React from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { decrement, increment, selectCounter } from './counterSlice'

  export function Counter() {
    const count = useSelector(selectCounter)
    const dispatch = useDispatch()

    return (
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    )
  }
  ```

  使用持久化储存

  安装 `$ npm install redux-persist`

  修改src/store.js

  ```
  import { combineReducers } from "redux";
  import { configureStore } from "@reduxjs/toolkit";
  import { persistStore, persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  import auth from "slice/auth";
  import language from "slice/language";
  import todoList from "slice/todoList";
  import loading from "slice/loading";

  const reducer = {
    auth,
    language,
    todoList,
    loading,
  };

  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(reducer)
  );

  const store = configureStore({
    reducer: persistedReducer,
  });

  export default store;
  export const persist = persistStore(store);
  ```

  使用 RTK query

  > api/user.js

  ```
  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const userSlice = createApi({
    reducerPath: "user",
    // 默认配置
    baseQuery: fetchBaseQuery({
      baseUrl: "https://jsonplaceholder.typicode.com",
    }),
    // 所有API
    endpoints: (builder) => ({
      signin: builder.mutation({
        query: (username) => ({
          url: `/users?username=${username}`,
        }),
      }),
      getUser: builder.query({
        query: (username) => ({
          url: `/users?username=${username}`,
        }),
      })
    }),
  });

  // Export the auto-generated hook for the `getPosts` query endpoint
  export const { useSigninMutation, useGetUserQuery } = userSlice;
  export default userSlice;
  ```

  > src.store.js

  ```
  import { combineReducers } from "redux";
  import { configureStore } from "@reduxjs/toolkit";
  import { persistStore, persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  import userSlice from "api/user";

  const reducer = {
    [userSlice.reducerPath]: userSlice.reducer,
  };

  const store = configureStore({
    reducer: reducer,
     middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userSlice.middleware)
  });

  export default store;
  ```

  > src/Login.js

  ```
  import { useState } from 'react'
  import { useSigninMutation, useGetUserQuery } from './api/user.js'

  function Login() {
    const [username, setUsername] = useState('')
    const {data, error, isLoading} = useGetUserQuery('test') // builder.query创建的api在use的时候会立刻调用
    const [signin, {isLoading}] = useSigninMutation() // builder.mutation创建的api在use之后不会立刻调用, 会返回一个数组, 第一个就是调用结口的方法

    return (
      <div>
        <input value={username} onInput={e => setUsername(e.currentTarget.value)}></input>
        <button onClick={() => signin(username)}>登录</button>
      </div>

    )
  }

  return Login
  ```

* 代替品

  [Undux](https://github.com/bcherny/undux)
  [Rxjs](https://github.com/ReactiveX/rxjs)
  [Flux](https://github.com/facebook/flux)
  [Mobx](https://github.com/mobxjs/mobx)

* 优点 

  代码格式统一, 易于维护

  有插件可以方便调试, 支持状态持久化

  社区生态丰富, 有很多扩展插件

* 缺点

  dispatch只能是同步
 
  编写流程繁琐, 有大量的模板代码
  
  







