const http = require("http");
import * as fs from "fs";
import { Application } from "express";
import * as dotenv from "dotenv";
import App from "./app";
import ApiRouter from "./routes";
import { Logger } from "../services/logging.service";

import UserController from "./controllers/users.controller";

dotenv.config({ path: ".env" });

export class Server {

    private app: Application;
    private readonly userController: UserController;


    public constructor(userController: UserController) {
        if (!userController) {
            throw new Error("Provided User Controller instance is not truthy!");
        }
        this.userController = userController;
        this.init();
    }

    public start() {
        this.app.listen(process.env.API_PORT);
    }

    private init() {
        const router = new ApiRouter(this.userController);
        this.app = (new App(router)).getApp();
        this.app.set("port", process.env.API_PORT);
    }

    private onError(ex: Error): void {
        Logger.error(ex);
    }

    public getApp(): Application {
        return this.app;
    }
}
