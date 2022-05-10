const createServer = require('./services/server/hapijs/createServer');

(async () => {
  const server = await createServer();
  await server.start();
  console.log(`server start at ${server.info.uri}`);
})();
