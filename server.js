const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config ( { path: "config.env" });
const app = express();

const port = process.env.PORT;
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
  console.log(`you work in ${process.env.NODE_ENV} mode`);
}
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
