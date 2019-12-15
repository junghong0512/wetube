// const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";

const app = express();

app.use(cookieParser()); // session을 다루기 위해 cookie에 사용자 정보 저장
app.use(bodyParser.json()); // body parser는 form 데이터 가진 request object에 접근
app.use(bodyParser.urlencoded({ extended: true })); // server가 user로부터 받은 data 를 다루는 방법
app.use(morgan("dev")); // logging 기능
app.use(helmet()); // 앱보안을 위해서 추가됨(특별한 기능은 없다)

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); // get:  use:
app.use(routes.videos, videoRouter);

export default app;
