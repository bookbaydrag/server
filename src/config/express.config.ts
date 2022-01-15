import cors from 'cors';
import express from 'express';
import { APIRouterV1 } from '../routes/index.js';
import { addServerToSignalHandling } from '../util/signal.js';

export async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/v1', APIRouterV1);

  const port = 8000;

  const server = app.listen(port, () => {
    console.info(`Listening on port ${port}`);
  });

  addServerToSignalHandling(server);
}

