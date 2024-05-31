const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require('./middlewares/errorMiddlewares')
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
  app.use(categoryRoute);

  //Create error and send it error handling middleware
  app.all("*", (req, res, next) => {
    next(
      new ApiError(`Can't find this router: ${req.originalUrl}`, 400)
    );
  });

  // Global error handling middleware for express
  app.use(globalError);
})();



const server = app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});


  // handle rejection outside express 

  process.on("unhandledRejection", (err) => {
    console.error(
      `UNHANDLED PROMISE REJECTION: ${err.name} | ${err.message}`
    );
    server.close(() => {
      console.error(`Shutting down.....`);
      process.exit(1);
    });
  });

 