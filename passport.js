import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // cookie는 use.id 만 가질 수 있음.(id만 전송 가능하다.)
passport.deserializeUser(User.deserializeUser()); // cookie의 정보(user.id)를 어떻게 사용자 전환할지(id로 사용자 식별)
