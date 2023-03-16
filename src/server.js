import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import route from "./routers/index";
import "dotenv/config";
import fileUploader from "express-fileupload";
import docoment from "./documentation/indexDoc";
const app = express();
app.use(bodyParser.json());
app.use(fileUploader({ useTempFiles: true }));
app.use("/api", route);
app.use("/mybrand", docoment);

const database = process.env.myDb;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Well connected");
  });
const port = process.env.PORT || 4040;

  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
  app.use("/", (res,req)=>{
    res.send("welcome to our brand")
  })
export default app
