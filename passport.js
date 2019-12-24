import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback // github으로 부터 제공되는 사용자 정보를 받는다
  )
);

passport.serializeUser(User.serializeUser()); // cookie는 use.id 만 가질 수 있음.(id만 전송 가능하다.)
passport.deserializeUser(User.deserializeUser()); // cookie의 정보(user.id)를 어떻게 사용자 전환할지(id로 사용자 식별)
