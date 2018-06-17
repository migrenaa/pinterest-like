import { Server } from "./api/server";
import UserController from "./api/controllers/users.controller";
import CategoriesController from "./api/controllers/categories.controller";


const runServer = async () => {
    const userController = new UserController();
    const categoriesController = new CategoriesController();

    const server: Server = new Server(userController, categoriesController);
    // Start the API
    server.start();
    console.log(`Server listening on port ${process.env.API_PORT}`);
};

runServer();

