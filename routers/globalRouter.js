import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getLogin,
  logout,
  getJoin,
  postJoin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin); // github 으로 접속(login 또는 join을 위해)

globalRouter.get(
  routes.githubCallback, // github에서 callback url 로 사용자 정보 전달(passport.authenticate 실행)
  passport.authenticate("github", {
    failureRedirect: routes.login
  }),
  postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postFacebookLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
