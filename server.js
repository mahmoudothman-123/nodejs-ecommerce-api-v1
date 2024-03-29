const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });
// Connect with db
mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error: ${err}`);
    process.exit(1);
  });
const app = express();

const port = process.env.PORT;
// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`you work in ${process.env.NODE_ENV} mode`);
}
// 1- Create schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// 2- create model
const categoryModel = mongoose.model("Category", categorySchema);

// Router
app.post("/", (req, res) => {
  const name = req.body.name;
  console.log(req.body);
  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
