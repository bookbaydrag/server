// code from https://medium.com/@becintec/building-graceful-node-applications-in-docker-4d2cd4d5d392

import * as http from 'http';

let globalServer: http.Server | null = null;

export function addServerToSignalHandling(server: http.Server) {
  globalServer = server;
}

export function initSignalHandling() {
  // The signals we want to handle
  // NOTE: although it is tempting, the SIGKILL signal (9)
  // cannot be intercepted and handled
  const signals: {[key: string]: number} = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
  };

  // Do any necessary shutdown logic for our application here
  const shutdown = (signal: string, value: number) => {
    console.log('shutting down!');
    if (globalServer) {
      globalServer.close(() => {
        console.log(`server stopped by ${signal} with value ${value}`);
        process.exit(128 + value);
      });
    } else {
      process.exit(128 + value);
    }
  };

  // Create a listener for each of the signals that we want to handle
  Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
      console.log(`process received a ${signal} signal`);
      shutdown(signal, signals[signal]);
    });
  });
};

export function terminateServer(message?: string): void {
  if (message) {
    console.info(message);
  }
  process.kill(process.pid);
}
