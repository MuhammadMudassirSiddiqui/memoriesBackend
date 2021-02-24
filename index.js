import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoute from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-type, Accept"
//   );
//   next();
// });
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("memories api");
});

mongoose
  .connect(process.env.CONNECT_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server listens on port : ${PORT} :)`));
  })
  .catch((error) => console.log(error));
