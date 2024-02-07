//imported packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//importing files
import ConnectDB from "./config/db.js";

//config dotenv
dotenv.config();
const PORT = process.env.PORT || 4006;

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
import userRoutes from "./routes/authAndAutherization.js";
import forgotUserRoutes from "./routes/forgotPasswordRoute.js";
//routing
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user", forgotUserRoutes);

//listening on port
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Server is running on port no : ${PORT}`);
  }
});

//Establishig connection
ConnectDB();
