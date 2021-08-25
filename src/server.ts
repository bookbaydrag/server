import express from 'express';
import cors from 'cors';
import { APIRouterV1 } from './routes/index.js';
import { dbConnect } from './config/mongoose.config.js';
import {
  addServerToSignalHandling,
  initSignalHandling,
} from './util/signal.js';

const server = async (): Promise<void> => {
  initSignalHandling();
  await dbConnect();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/v1', APIRouterV1);

  const port = 8000;

  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  addServerToSignalHandling(server);
};

server();
