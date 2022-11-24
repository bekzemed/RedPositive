const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//
const app = express();

// cors
app.use(cors());

// using express as a body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db config
const db = process.env.MONGO_URL;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at port ${port}`));
