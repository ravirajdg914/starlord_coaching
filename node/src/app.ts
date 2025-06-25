import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:9000" }));
app.use(morgan("dev"));

app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

export default app;
