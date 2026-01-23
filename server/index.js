import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AuthenticationRouter } from "./routes/AuthenticationRouter.js";
import { EstateRouter } from "./routes/EstateRouter.js";
import { AgencyRouter } from "./routes/AgencyRouter.js";
import { UserRouter } from "./routes/UserRouter.js";
//import { managerRouter } from './routes/managerRouter.js';
//import { adminRouter } from './routes/adminRouter.js';
import { AgentRouter } from "./routes/AgentRouter.js";
import { OfferRouter } from "./routes/OfferRouter.js";
import { ImageRouter } from "./routes/ImageRouter.js";
import { database as sequelize } from "./models/DietiRealEstatesDB.js";

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promessa non gestita:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Eccezione non catturata (il server sta crashando):", err);
  // In produzione qui dovresti riavviare, in dev serve a leggere l'errore
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
  next();
});

app.use(AuthenticationRouter);
app.use("/real-estates", EstateRouter);
app.use("/agency", AgencyRouter);
//app.use("/managers", managerRouter);
//app.use("/admin", adminRouter);
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

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connessione al database stabilita.");

    await sequelize.sync({ alter: false });

    await sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_pending_offer
      ON "Offers" ("idUser", "idRealEstate")
      WHERE status = 'pending';
    `);

    console.log("Database sincronizzato correttamente.");

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`SERVER ATTIVO E IN ASCOLTO SULLA PORTA ${PORT}`);
    });

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error(" Errore fatale all'avvio:", error);
    process.exit(1);
  }
};

start();
