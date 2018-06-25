import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router } from "express";
import { PostStore } from "../../stores/post.store";
dotenv.config({ path: ".env" });
import * as passport from "passport";
import { UserStore } from "../../stores/user.store";


export default class PostsController {
    private router: Router;
    constructor() {
        this.router = Router();
        // this.router.route("/")
        //     .get(passport.authenticate("jwt", { session: false }),
        //     (req, res, next) => this.search(req, res, next));
        // this.router.route("/")
        //     .post(passport.authenticate("jwt", { session: false }),
        //     (req, res, next) => this.addPost(req, res, next));
        this.router.post("/", (req, res, next) => this.addPost(req, res, next));
        this.router.get("/", (req, res, next) => this.search(req, res, next));
    }

    public getRouter(): Router {
        return this.router;
    }

    public async search(req: Request, res: Response, next: NextFunction) {
        if (!req.query.categoryName) {
            const posts = await PostStore.getAll();
            res.status(200).send(posts);
        } else {
            const posts = await PostStore.getByCategoryName(req.query.categoryName);
            res.status(200).send(posts);
        }
    }

    public async addPost(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(400).send("JSON body not provided.");
        } else if (!req.body.content) {
            res.status(400).send("Content not provided.");
        } if (!req.body.email) {
            res.status(400).send("Email not provided");
        } if (!req.body.categories) {
            res.status(400).send("At least one categoryId should be provided");
        }

        const user = await UserStore.getByEmail(req.body.email);
        const post = await PostStore.create(
            req.body.content,
            req.body.photoUrl,
            user.id,
        );
        for (const category of req.body.categories) {
            await PostStore.relatePostToCategory(post, category.id);
        }

        res.status(201).send(post);
    }
}
