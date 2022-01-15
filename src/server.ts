import { dbConnect } from './config/mongoose.config.js';
import {
  initSignalHandling,
} from './util/signal.js';
import { startEmailPolling } from './events/email.events.js';
import { startServer } from './config/express.config.js';

const server = async (): Promise<void> => {
  initSignalHandling();
  await dbConnect();
  await startServer();
  startEmailPolling();
};

server();
