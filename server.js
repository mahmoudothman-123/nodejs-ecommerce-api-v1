const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const app = express();
const port = process.env.PORT;

(async () => {
  await dbConnection();

  //middleware
  app.use(express.json());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`you work in ${process.env.NODE_ENV} mode`);
  }

  // Mount Router
  app.use("/api/v1/categories", categoryRoute);

  app.listen(port, () => {
    console.log(`app is running in port ${port}`);
  });
})();


