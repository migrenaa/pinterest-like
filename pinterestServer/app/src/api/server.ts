/**
 * Copyright (c) 2018 Centroida.AI All rights reserved.
 */


// import * as https from "https";
const http = require("http");
import * as fs from "fs";
import { Application } from "express";
import * as dotenv from "dotenv";
import App from "./app";
import ApiRouter from "./routes";
import { Logger } from "../services/logging.service";

dotenv.config({ path: ".env" });

export class Server {

    private app: Application;


    public constructor() {
        this.init();
    }

    public start() {
        this.app.listen(process.env.API_PORT);
    }

    private init() {
        const router = new ApiRouter();
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
