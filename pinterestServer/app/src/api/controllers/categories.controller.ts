import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router } from "express";
import { PostStore } from "../../stores/post.store";
import { CategoryStore } from "../../stores/category.store";
dotenv.config({ path: ".env" });
import * as passport from "passport";

export default class CategorisController {
    private router: Router;
    constructor() {
        this.router = Router();
        this.router.route("/:id/posts")
            .get(passport.authenticate("jwt", { session: false }),
            (req, res, next) => this.getPostsByCategory(req, res, next));

        this.router.route("/")
            .get(passport.authenticate("jwt", { session: false }),
            (req, res, next) => this.searchForCategories(req, res, next));

        this.router.route("/")
            .post(passport.authenticate("jwt", { session: false }),
            (req, res, next) => this.addCategory(req, res, next));
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

    public async addCategory(req: Request, res: Response, next: NextFunction) {
        if (!req.body.name) {
            res.status(400).send("The name property is not provided.");
        } else {
            const categories = await CategoryStore.create(req.body.name, req.body.description);
            res.status(201).send(categories);
        }
    }
}
