import express from 'express';
import cors from 'cors';
import { AuthenticationRouter } from './routes/AuthenticationRouter.js';
//import { realEstateRouter } from './routes/realEstateRouter.js';
import { AgencyRouter } from './routes/AgencyRouter.js';
//import { userRouter } from './routes/userRouter.js';
//import { managerRouter } from './routes/managerRouter.js';
//import { adminRouter } from './routes/adminRouter.js';
import { AgentRouter } from './routes/AgentRouter.js';
//app.use(cors());

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(AuthenticationRouter);
//app.use("/real-estates", realEstateRouter);
app.use("/agency", AgencyRouter);
//app.use("/users", userRouter);
//app.use("/managers", managerRouter);
//app.use("/admin", adminRouter);
app.use("/agents", AgentRouter);


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred",
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});