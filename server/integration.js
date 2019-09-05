const d2gsi = require('dota2-gsi');
let listenerAdded = false;

class GSIntegration {
  static init(response) {
    if (this.integrationServer == null) this.integrationServer = new d2gsi();

    if (!listenerAdded) {
      listenerAdded = true;
      this.integrationServer.events.on('new client', (client) => {
        console.log("New client connection, IP address: " + client.ip);
        console.log("Auth token: " + client.auth.token);

        client.on('player:activity', (activity) => {
          if (activity == 'playing') GSIntegration._writeData(response, "ON_GAME_START");
        });

        client.on('map:clock_time', (clockTime) => {
          let inttime = parseInt(clockTime, 10);
          // time can be negative in Dota
          if ((inttime + 30) % 300 == 0 && (inttime + 30) > 0) {
            GSIntegration._writeData(response, "THIRTY_SECOND_WARNING");
          }
        });
      });
    }
  }

  static _writeData(response, event) {
    response.write(`data: {"event":"${event}"} \n\n`);
    response.write("\n\n");
  }
}

module.exports = GSIntegration;
