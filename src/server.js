import net from "net";

const createServer = (nodeConfig, eventBus) => {
  const server = net.createServer((socket) => {
    console.log("Client connected");

    let remoteNodeId = null;

    socket.on("data", (data) => {
      const { from, message } = JSON.parse(data.toString());
      if (!remoteNodeId) {
        remoteNodeId = from;
        eventBus.registerClient(remoteNodeId, socket);
      }
      eventBus.handleMessage(from, message);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
      if (remoteNodeId) {
        eventBus.unregisterClient(remoteNodeId);
      }
    });
  });

  server.listen(nodeConfig.port, nodeConfig.host, () => {
    console.log(`Server listening on ${nodeConfig.host}:${nodeConfig.port}`);
  });

  return server;
};

export default createServer;
