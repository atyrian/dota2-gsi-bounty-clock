const d2gsi = require('dota2-gsi');
const Connections = require('./connections');
let listenerAdded = false;

class GSIntegration {
  static init(response) {
    if (this.integrationServer == null) {
      this.integrationServer = new d2gsi();
      this.connections = new Connections().getInstance();
      console.log("Set up server")
    }

    if (!listenerAdded) {
      console.log("Added listeners")
      listenerAdded = true;
      this.integrationServer.events.on('new client', (client) => {
        console.log("New client connection, IP address: " + client.ip);
        console.log("Auth token: " + client.auth.token);

        client.on('player:activity', (activity) => {
          if (activity == 'playing') {
            console.log("Playing!")
            this.connections.send('ON_GAME_START');
          }
        });

        client.on('map:clock_time', (clockTime) => {
          let inttime = parseInt(clockTime, 10);
          // time can be negative in Dota
          if ((inttime + 30) % 300 == 0 && (inttime + 30) > 0) {
            this.connections.send('THIRTY_SECOND_WARNING');
          }
        });
      });
    }
  }
}

module.exports = GSIntegration;
