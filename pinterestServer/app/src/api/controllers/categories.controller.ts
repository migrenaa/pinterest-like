import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router } from "express";
import { PostStore } from "../../stores/post.store";
import { CategoryStore } from "../../stores/category.store";
dotenv.config({ path: ".env" });


export default class CategorisController {
    private router: Router;
    constructor() {
        this.router = Router();
        this.router.get("/:id/posts", (req: any, res: any, next: any) => { this.getPostsByCategory(req, res, next); });
        this.router.get("/", (req: any, res: any, next: any) => { this.searchForCategories(req, res, next); });
    }

    public getRouter(): Router {
        return this.router;
    }

    public async getPostsByCategory(req: Request, res: Response, next: NextFunction) {
        const category = await CategoryStore.getById(req.params.id);
        if (!category || category === "") {
            res.status(404).send("No such category.");
        }
        const posts = await PostStore.getByCategoryId(req.params.id);
        res.status(200).send(posts);

    }

    public async searchForCategories(req: Request, res: Response, next: NextFunction) {
        if (!req.params.name) {
            const categories = await CategoryStore.getAll();
            res.status(200).send(categories);
        } else {
            const categories = await CategoryStore.search(req.params.name);
            res.status(200).send(categories);
        }
    }
}
