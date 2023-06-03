import net from "net";

const connectToHost = (
  host,
  port,
  remoteNodeId,
  eventBus,
  retryDelay = 3000
) => {
  console.log(`Connecting to ${host}:${port}`);
  const client = net.createConnection(port, host);

  client.on("connect", () => {
    console.log(`Connected to ${host}`);
    eventBus.registerClient(remoteNodeId, client);
    client.write(
      JSON.stringify({
        from: eventBus.nodeId,
        message: "Hello, server! Love, Client.",
      })
    );
  });

  client.on("end", () => {
    console.log(`Disconnected from ${host}`);
    eventBus.unregisterClient(remoteNodeId);
    setTimeout(
      () => connectToHost(host, port, remoteNodeId, eventBus, retryDelay),
      retryDelay
    );
  });

  client.on("error", (err) => {
    console.log(err);
    setTimeout(
      () => connectToHost(host, port, remoteNodeId, eventBus, retryDelay),
      retryDelay
    );
  });

  return client;
};

export default connectToHost;
