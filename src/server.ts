import express from 'express';
import cors from 'cors';
import { APIRouterV1 } from './routes/index.js';
import { dbConnect } from './config/mongoose.config.js';

const server = async (): Promise<void> => {
  await dbConnect();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api/v1', APIRouterV1);

  const port = 8000;

  app.listen(port, () => console.log(`Listening on port ${port}`) );
};

server();
