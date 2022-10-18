import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import middleware from 'store/middleware';

import auth from 'store/slice/auth';
import language from 'store/slice/language';
import todoList from 'store/slice/todoList';
import loading from 'store/slice/loading';
import userSlice from 'store/api/user';
import todosSlice from 'store/api/todos';

const reducer = {
  auth,
  language,
  todoList,
  loading,
  [userSlice.reducerPath]: userSlice.reducer,
  [todosSlice.reducerPath]: todosSlice.reducer,
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducer));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (...arg) => [...middleware(...arg), userSlice.middleware, todosSlice.middleware],
});

export default store;
export const persist = persistStore(store); // 数据持久化存储

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
