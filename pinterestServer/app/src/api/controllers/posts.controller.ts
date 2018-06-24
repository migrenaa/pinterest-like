import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router } from "express";
import { PostStore } from "../../stores/post.store";
dotenv.config({ path: ".env" });


export default class PostsController {
    private router: Router;
    constructor() {
        this.router = Router();
        this.router.get("/", (req: any, res: any, next: any) => { this.search(req, res, next); });
    }

    public getRouter(): Router {
        return this.router;
    }

    public async search(req: Request, res: Response, next: NextFunction) {
        if (!req.params.categoryName) {
            const posts = await PostStore.getAll();
            res.status(200).send(posts);
        } else {
            const posts = await PostStore.getByCategoryName(req.params.categoryName);
            res.status(200).send(posts);
        }
    }
}
