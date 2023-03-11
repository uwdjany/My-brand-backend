import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import docoment from "./documentation/indexDoc";
import route from "./router/index";
import fileUploader from "express-fileupload";
const app = express();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
app.use(bodyParser.json());
app.use(fileUploader({ useTempFiles: true }));
app.use("/api", route);

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My Brand",
//       vesion: "1.0.0",
//     },
//     servers: [
//       {
//         url: "http://localhost:9090/",
//       },
//     ],
//   },
//   apis: ["./src/router/index.js"],
// };

//const swaggerTemp = swaggerJSDoc(options);
// app.use("/mybrand", swaggerUi.serve, swaggerUi.setup(swaggerTemp));

app.use("/mybrand", docoment);

const database = process.env.myDb;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Well connected");
  });
const port = process.env.PORT || 4040;
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
}

export default app;
