/**
 * Copyright (c) 2018 Centroida.AI All rights reserved.
 */

import { Server } from "./api/server";

const runServer = async () => {
    const server: Server = new Server();
    // Start the API
    server.start();
};

runServer();

