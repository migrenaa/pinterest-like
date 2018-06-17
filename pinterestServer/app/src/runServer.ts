import { Server } from "./api/server";
import UserController from "./api/controllers/users.controller";


const runServer = async () => {
    const userController = new UserController();
    const server: Server = new Server(userController);
    // Start the API
    server.start();
    console.log(`Server listening on port ${process.env.API_PORT}`);
};

runServer();

