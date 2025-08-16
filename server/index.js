import express from 'express';
import cors from 'cors';

//app.use(cors());

const app = express();
const PORT = 3000;


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred",
    });
  });

app.listen(PORT);