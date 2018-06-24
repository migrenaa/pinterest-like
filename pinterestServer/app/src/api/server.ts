import { Application } from "express";
import * as dotenv from "dotenv";
import App from "./app";
import ApiRouter from "./routes";
import { Logger } from "../services/logging.service";
import * as passport from "passport";
dotenv.config({ path: ".env" });
import { JWT } from "../config/passport.config";

import UserController from "./controllers/users.controller";
import CategoryController from "./controllers/categories.controller";

import PostsController from "./controllers/posts.controller";

dotenv.config({ path: ".env" });

export class Server {

    private app: Application;
    private readonly userController: UserController;
    private readonly categoryController: CategoryController;
    private readonly postsController: PostsController;

    public constructor(userController: UserController, categoryController: CategoryController,
    postsController: PostsController) {
        if (!userController) {
            throw new Error("Provided User Controller instance is not truthy!");
        }
        if (!categoryController) {
            throw new Error("Provided Category Controller instance is not truthy!");
        }
        if (!postsController) {
            throw new Error("Provided Posts Controller instance is not truthy!");
        }
        this.userController = userController;
        this.categoryController = categoryController;
        this.postsController = postsController;
        this.init();
    }

    public start() {
        this.app.listen(process.env.API_PORT);
    }

    private init() {
        const router = new ApiRouter(this.userController, this.categoryController,
        this.postsController);
        this.app = (new App(router)).getApp();
        this.app.set("port", process.env.API_PORT);
        this.app.set("superSecret", process.env.CONFIG_KEY);

        this.app.use(passport.initialize());
        this.app.use(passport.session());
        JWT.configAuth(passport);
    }

    private onError(ex: Error): void {
        Logger.error(ex);
    }

    public getApp(): Application {
        return this.app;
    }
}
