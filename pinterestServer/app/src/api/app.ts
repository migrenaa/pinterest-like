
import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import ApiRouter from "./routes";
dotenv.config({ path: ".env" });
import { Request, Response, NextFunction } from "express";

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
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const allowedOrigins = ["*"];
            const origin = req.headers.origin.toString();
            if (allowedOrigins.indexOf(origin) > -1) {
                res.header("Access-Control-Allow-Origin", origin);
            }
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
            );
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });

    }

    private _initRoutes(): void {
        this.app.use("/api", this.router.getRouter());
    }
}
