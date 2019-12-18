import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video"; // mongoose connection aware of the models so it can register them
import "./models/Comment";

const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
