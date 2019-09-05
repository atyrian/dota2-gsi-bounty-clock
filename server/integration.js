const d2gsi = require('dota2-gsi');
const Connections = require('./connections');
let listenerAdded = false;

class GSIntegration {
  static init() {
    if (this.integrationServer == null) {
      this.integrationServer = new d2gsi();
      this.connections = new Connections().getInstance();
    }

    if (!listenerAdded) {
      listenerAdded = true;
      this.integrationServer.events.on('newclient', (client) => {
        console.log("New Dota client connection: " + client.ip);
        console.log("Auth token: " + client.auth.token);

        client.on('player:activity', (activity) => {
          if (activity == 'playing') this.connections.sendToClients('ON_GAME_START');
        });

        client.on('map:clock_time', (clockTime) => {
          let inttime = parseInt(clockTime, 10);
          // time can be negative in Dota
          if ((inttime + 30) % 300 == 0 && (inttime + 30) > 0) {
            this.connections.sendToClients('THIRTY_SECOND_WARNING');
          }
        });
      });
    }
  }
}

module.exports = GSIntegration;
