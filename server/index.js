const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const limitter = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/users", userRouter);
app.use(express.json());
// app.use(
//   limitter({
//     windowMs: 5000,
//     max: 5,
//     message: {
//       code: 429,
//       message: "Too many request",
//     },
//   })
// );

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongodb connection established successfully");
    }
  }
);

app.get("/", (req, res) => {
  return res.json("hello");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
