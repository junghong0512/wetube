import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/we-tube", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connented to DB");
const handleError = error => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
