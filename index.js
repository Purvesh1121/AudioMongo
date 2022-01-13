const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// DB connection
mongoose
  .connect("mongodb://localhost:27017/testAudio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
const rootRoutes = require("./routes/root");

// use Routes

app.use("/", rootRoutes);

const PORT = 3080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
