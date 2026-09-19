import express from "express";
import userRoutes from "./routes/users.js";
import authRouter from "./routes/auth.js";
import organizationRoutes from "./routes/organizations.js";
import eventRoutes from "./routes/events.js";
import registrationRoutes from "./routes/registrations.js";
import log from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(`Error connecting to database ${err}`);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.ALLOWED_ORIGIN, "http://localhost:5173", "http://localhost:5174"].filter(Boolean);

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // Allow requests with no origin (like curl/server-to-server) or any localhost port
      if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Blocked by CORS"));
    },
  }),
);
app.use(log);

app.get("/api", (req, res) => res.json({ message: "API is working" }));

app.use("/api/users", userRoutes);

app.use("/api/auth", authRouter);

app.use("/api/organizations", organizationRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/registrations", registrationRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
