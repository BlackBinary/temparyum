class EventBus {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.clients = new Map();
  }

  sendToNode(targetNodeId, message) {
    const client = this.clients.get(targetNodeId);
    if (client) {
      client.write(JSON.stringify({ from: this.nodeId, message }));
    } else {
      console.error(
        `Unable to send message to node ${targetNodeId}: Not connected.`
      );
    }
  }

  registerClient(nodeId, client) {
    this.clients.set(nodeId, client);
  }

  unregisterClient(nodeId) {
    this.clients.delete(nodeId);
  }

  broadcast(message) {
    for (const nodeId of this.clients.keys()) {
      this.sendToNode(nodeId, message);
    }
  }

  handleMessage(from, message) {
    console.log(`EB: Message from ${from}: ${message}`);
  }
}

export default EventBus;
