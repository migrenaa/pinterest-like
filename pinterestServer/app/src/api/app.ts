
import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import ApiRouter from "./routes";
dotenv.config({ path: ".env" });

export default class App {
    private readonly app: express.Application;
    private readonly router: ApiRouter;

    constructor(router: ApiRouter) {
        this.router = router;
        this.app = express();
        this._initMiddleware();
        this._initRoutes();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private _initMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    private _initRoutes(): void {
        this.app.use("/api", this.router.getRouter());
    }
}
