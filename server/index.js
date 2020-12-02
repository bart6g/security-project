const express = require("express");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/users", userRouter);
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
