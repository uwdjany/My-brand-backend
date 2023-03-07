import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./router";
const app = express();
app.use(bodyParser.json())
app.use("/mybrand",route)
const database = process.env.myDb;
mongoose.connect(database, {useNewUrlParser:true,useUnifiedTopology: true,}).then(()=>{
console.log("Database Well connected")
})
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

export default app;
