const config = {
  NODE1: {
    port: 3000,
    host: "0.0.0.0",
    hosts: [
      ["localhost", 3001],
    ],
  },
  NODE2: {
    port: 3001,
    host: "0.0.0.0",
    hosts: [
      ["localhost", 3000],
    ],
  },
};

function getConfig() {
  const nodeId = process.env.NODE_ID;
  if (!nodeId || !(nodeId in config)) {
    throw new Error("NODE_ID is not defined");
  }
  return config[nodeId];
}

export default {
  getConfig,
  config,
};
