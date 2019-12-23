import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

// Registering Models to MongoDB
import "./models/Video"; // mongoose connection aware of the models so it can register them
import "./models/Comment";
import "./models/User"; // To make the Models aware of the current Mongoose connection to MongoDB

const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
