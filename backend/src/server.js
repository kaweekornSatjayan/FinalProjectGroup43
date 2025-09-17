import "dotenv/config";
import http from "http";

import app from "./app.js";
// --- CORRECTED IMPORT HERE ---
// Use a named import to match the export style in db.js
import { connectDB } from "./config/db.js";

// Connect to the database
connectDB();

const server = http.createServer(app);

// Graceful error handling and shutdown
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

const PORT = 3222;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server ready at http://localhost:${PORT}`);
});


