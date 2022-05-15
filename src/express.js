const { serverConfig } = require('./configs/server');
const app = require('./server/express/createServer');
const container = require('./container');

app(container).listen(serverConfig.port, serverConfig.host, () => {
  console.log(`Server running in port: ${serverConfig.port}`);
});
