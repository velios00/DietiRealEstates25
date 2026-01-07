import express from "express";
import cors from "cors";
import { AuthenticationRouter } from "./routes/AuthenticationRouter.js";
import { EstateRouter } from "./routes/EstateRouter.js";
import { AgencyRouter } from "./routes/AgencyRouter.js";
import { UserRouter } from "./routes/UserRouter.js";
//import { managerRouter } from './routes/managerRouter.js';
//import { adminRouter } from './routes/adminRouter.js';
import { AgentRouter } from "./routes/AgentRouter.js";
//app.use(cors());

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(AuthenticationRouter);
app.use("/real-estates", EstateRouter);
app.use("/agency", AgencyRouter);
//app.use("/managers", managerRouter);
//app.use("/admin", adminRouter);
app.use("/agents", AgentRouter);
app.use("/user", UserRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
