export default function middleware(getDefaultMiddleware: any) {
  const middleware = [...getDefaultMiddleware()];

  return middleware;
}
