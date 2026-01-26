import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AuthenticationRouter } from "./routes/AuthenticationRouter.js";
import { EstateRouter } from "./routes/EstateRouter.js";
import { AgencyRouter } from "./routes/AgencyRouter.js";
import { UserRouter } from "./routes/UserRouter.js";
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
app.use("/agents", AgentRouter);
app.use("/user", UserRouter);
app.use("/offers", OfferRouter);
app.use("/images", ImageRouter);

// Endpoint di health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error("Errore:", err);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred",
  });
});

// Aggiungi questa variabile globale per il server
let server;

// Implementa la funzione shutdown
const shutdown = async (signal) => {
  console.log(`Ricevuto ${signal}, chiudo il server...`);

  if (server) {
    server.close(() => {
      console.log("Server HTTP chiuso.");

      // Chiudi la connessione al database
      sequelize
        .close()
        .then(() => {
          console.log("Connessione al database chiusa.");
          process.exit(0);
        })
        .catch((err) => {
          console.error("Errore nella chiusura del database:", err);
          process.exit(1);
        });
    });

    // Timeout forzato dopo 10 secondi
    setTimeout(() => {
      console.error("Timeout nella chiusura del server, forzando l'uscita...");
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

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

    server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`SERVER ATTIVO E IN ASCOLTO SULLA PORTA ${PORT}`);

      // Log periodico per tenere traccia
      setInterval(() => {
        console.log(
          `Server attivo da ${process.uptime().toFixed(0)}s, PID: ${process.pid}`,
        );
      }, 60000); // Ogni minuto
    });

    // Gestione errori del server
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Porta ${PORT} già in uso.`);
      } else {
        console.error("Errore del server:", error);
      }
      process.exit(1);
    });

    // Keep-alive per il database (opzionale ma utile)
    setInterval(async () => {
      try {
        await sequelize.query("SELECT 1");
        console.log("Keep-alive query eseguita");
      } catch (err) {
        console.error("Errore keep-alive database:", err);
      }
    }, 30000); // Ogni 30 secondi

    // Registra gli handler di shutdown
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    // Prevenire l'uscita per stdin (utile in dev)
    if (process.stdin.isTTY) {
      process.stdin.resume();
    }
  } catch (error) {
    console.error("Errore fatale all'avvio:", error);
    process.exit(1);
  }
};

start();
