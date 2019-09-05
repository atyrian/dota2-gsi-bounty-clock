class ConnectionHandler {
  constructor() {
    this.connections = [];
    this.setupHeartBeat();
  }

  setupConnection(ip, res) {
    this.connections.push({ ip, res });
    console.log(`Client ${ip} connected. Now: ${this.connections.length} clients connected`)
    res.on("close", () => {
      this.removeConnection(ip)
      console.log(`Disconnected IP: ${ip}. Now: ${this.connections.length} clients connected`)
    });
  }

  removeConnection(ip) {
    this.connections.forEach((obj, i) => {
      if (obj.ip == ip) {
        this.connections.splice(i, 1)
      }
    });
  }

  sendToClients(event) {
    if (this.connections.length == 0) return;

    this.connections.forEach((client) => {
      client.res.write(`data: {"event":"${event}"} \n\n`);
      client.res.write("\n\n");
    });
  }

  setupHeartBeat() {
    setInterval(() => {
      this.sendToClients('heartbeat')
    }, 10000);
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new ConnectionHandler();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
