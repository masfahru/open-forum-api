const createServer = require('./server/hapijs/createServer');
const container = require('./container');

(async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`server start at ${server.info.uri}`);
})();
