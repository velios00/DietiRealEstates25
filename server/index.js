import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { AuthenticationRouter } from "./routes/AuthenticationRouter.js";
import { EstateRouter } from "./routes/EstateRouter.js";
import { AgencyRouter } from "./routes/AgencyRouter.js";
import { UserRouter } from "./routes/UserRouter.js";
import { AgentRouter } from "./routes/AgentRouter.js";
import { OfferRouter } from "./routes/OfferRouter.js";
import { ImageRouter } from "./routes/ImageRouter.js";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(helmet());

app.use(cors());
app.use(AuthenticationRouter);
app.use("/real-estates", EstateRouter);
app.use("/agency", AgencyRouter);
app.use("/agents", AgentRouter);
app.use("/user", UserRouter);
app.use("/offers", OfferRouter);
app.use("/images", ImageRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
