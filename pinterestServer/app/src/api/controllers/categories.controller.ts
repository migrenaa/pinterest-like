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
        this.router.post("/:id/posts", (req: any, res: any, next: any) => { this.getPostsByCategory(req, res, next); });
    }

    public getRouter(): Router {
        return this.router;
    }

    public async getPostsByCategory(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        console.log(id);
        if (!id) {
            const posts = await PostStore.getAll();
            res.status(200).send(posts);
        } else {
            const category = await CategoryStore.getById(id);
            if (!category) {
                res.status(404).send("No such category.");
            }
            const posts = await PostStore.getByCategoryId(id);
            res.status(200).send(posts);
        }
    }

    public async searchForCategories(req: Request, res: Response, next: NextFunction) {
        if (!req.body.content) {
            res.status(400).send({ success: false, message: "Content is a required field." });
        } else if (!req.body.authorId) {
            res.status(400).send({ success: false, message: "AuthorId is a required field." });
        } else {
            const id = await PostStore.create(
                req.body.content,
                req.body.photoUrl,
                req.body.authorId
            );
            res.status(201).send({ id: id[0] });
        }
    }
}