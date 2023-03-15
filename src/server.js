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
const port = process.env.PORT || 4040;



const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.myDb);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Connect to the database before listening
connectDB().then(() => {
  if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
      console.log(`server is running on ${port}`);
  })
}
})

export default app
