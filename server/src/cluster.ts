import cluster from "cluster";
import os from "os";
import app from "./app";
import db from "./libs/db";

const PORT = process.env.PORT || 3000;

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  console.log(`Forking for ${numCPUs + 7} CPUs...\n`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new one...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    db();
    console.log(`Worker ${process.pid} started server on port ${PORT}`);
  });
}
