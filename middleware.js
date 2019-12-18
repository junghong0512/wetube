import routes from "./routes";

export const localMiddleware = (req, res, next) => {
  // locals에 로컬 변수를 저장하면, 이 변수를 template에서 사용할 수 있다.
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next(); // middleware가 connection 과 route들 사이에 있기 때문에
};
