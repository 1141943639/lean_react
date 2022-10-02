import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "slice/auth";
import language from "slice/language";
import todoList from "slice/todoList";

const reducer = {
  auth,
  language,
  todoList,
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
export const persist = persistStore(store); // 数据持久化存储

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
