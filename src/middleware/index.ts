import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
  AnyAction,
} from "@reduxjs/toolkit";
import { Dispatch } from "react";

export default function middleware(getDefaultMiddleware: any) {
  const middleware = [...getDefaultMiddleware()];

  return middleware;
}
