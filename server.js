const express = require('express');
const path = require('path');
const app = express();

const GSIntegration = require('./server/integration');
const Connections = require('./server/connections');
const port = 1337;
let clientArray = [];


app.use(express.static(path.join(__dirname, "./public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/sse-gsi', (request, response) => {
  response.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache"
  });

  connections = new Connections().getInstance();
  connections.setupConnection(request.ip, response);
  GSIntegration.init();
});

app.listen(port, () => console.log(`Bounty Clock running on http://localhost:${port}`));