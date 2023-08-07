import { exit } from 'node:process';
import httpServer from './server.js';
import network from './config/network.js';

httpServer.listen(network.PORT, async () => {
  try {
    console.log(`API server listening on port: ${network.PORT}`);
  } catch (err) {
    console.log('Cannot run server! ', err);
    exit();
  }
});
