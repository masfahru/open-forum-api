const ServerConfig = require('./configs/server');
const app = require('./services/server/express/createServer');

app.listen(ServerConfig.PORT, () => {
  console.log(`Server berjalan di port: ${ServerConfig.PORT}`);
});
