// const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from Hong");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser()); // session을 다루기 위해 cookie에 사용자 정보 저장
app.use(bodyParser.json()); // body parser는 form 데이터 가진 request object에 접근
app.use(bodyParser.urlencoded({ extended: true })); // server가 user로부터 받은 data 를 다루는 방법
app.use(morgan("dev")); // logging 기능
app.use(helmet()); // 앱보안을 위해서 추가됨(특별한 기능은 없다)

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
