// const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middleware";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet()); // 앱보안을 위해서 추가됨(특별한 기능은 없다)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// 제거 app.use("/uploads", express.static("uploads")); // directory 에서 file 을 내보내주는 middleware(expose a foler to the internet)
// 변경 app.use("/static", express.static("static")); // static route 를 추가한다.(/static 이라는 라우터가 존재하지 않기 때문에), static router에 접근하면 static folder로 유도한다
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser()); // cookie를 전달 받아서 사용할 수 있도록 만들어주는 middleware
app.use(bodyParser.json()); // body parser는 form 데이터 가진 request object에 접근 (req.body 로 전송된 데이터에 접근할 수 있다)
app.use(bodyParser.urlencoded({ extended: true })); // server가 user로부터 받은 data 를 다루는 방법
app.use(morgan("dev")); // logging 기능
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }) // mongoose 가 db(MongoDB)에 연결해준다. 서버를 재시작 하더라도 쿠키를 유지한다
  })
);

app.use(flash()); // local 메세지를 사용할 수 있게 해주는 middleware (새로운 page request 가 있을 때 지워진다)

app.use(passport.initialize()); // 위에서 cookieParser를 실행시키고, 여기에서 초기화 시켜준다 (초기화를 통해서 req.user 에 user 정보가 들어간다)
app.use(passport.session()); // passport가 스스로 쿠키를 뒤져서, 쿠키 정보에 해당되는 사용자를 찾아준다.

app.use(localMiddleware); // app객체의 locals변수에 저장

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
