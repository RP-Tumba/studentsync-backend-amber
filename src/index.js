import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import routes from "./routes/index.js";
import { errorResponse, logger } from "./utils/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Kepler Capstone Backend!");
});

// api routes
app.use("/api/v1", routes);
app.use

// Middleware to handle 404 errors
app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
  next(err); // Pass the error to the error handler
});

// Default error handler
app.use(errorResponse);

//fetch data of student
// app.get('/selectData', (req, res)=>{
//   const fetchData = 'select * from student';
//   co
// })

// listen for incoming requests

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
