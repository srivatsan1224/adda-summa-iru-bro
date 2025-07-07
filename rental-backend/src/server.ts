import app from "./app";
import config from "./config";

const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
  if (config.nodeEnv !== 'production') {
    console.log(`🔗 Allowed CORS origins: ${config.corsAllowedOrigins.join(', ')}`);
  }
});

const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"]; // SIGQUIT not standard on Windows

signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log("✅ HTTP server closed.");
      // Add any other cleanup activities here (e.g., database.close() if applicable)
      process.exit(0);
    });

    setTimeout(() => {
      console.error("❌ Could not close connections in time, forcing shutdown.");
      process.exit(1);
    }, 10000); // 10 seconds
  });
});

process.on("unhandledRejection", (reason: Error | any, promise: Promise<any>) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  console.error("Reason:", reason.stack || reason);
  // console.error("Promise:", promise); // Uncomment for more details if needed
  server.close(() => {
    process.exit(1);
  });
  setTimeout(() => process.exit(1), 2000); // Force exit if server.close hangs
});

process.on("uncaughtException", (err: Error) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  console.error(err.stack);
  // For uncaught exceptions, it's generally recommended to exit immediately
  // as the application state is unknown. Graceful shutdown might not be reliable.
  process.exit(1);
});

export default server;