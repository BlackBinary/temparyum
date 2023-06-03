import { randomBytes } from "crypto";

import EventBus from "./eventBus";
import config from "./config";
import createServer from "./server";
import connectToHost from "./client";
import handleCliInput from "./cli";

const clientId = randomBytes(16).toString("hex");

(() => {
  console.log("Starting node...");
  console.log(`Client identifier: ${clientId}`);

  const nodeConfig = config.getConfig();
  const eventBus = new EventBus(clientId);

  createServer(nodeConfig, eventBus);

  nodeConfig.hosts.forEach(([host, port, nodeId]) => connectToHost(host, port, nodeId, eventBus));

  handleCliInput(eventBus);
})();