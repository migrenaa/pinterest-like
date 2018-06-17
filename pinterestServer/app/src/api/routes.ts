import { Router } from "express";
import UserController from "../api/controllers/users.controller";
import CategoryController from "../api/controllers/categories.controller";


export default class ApiRouter {
    private readonly router: Router;
    private readonly userController: UserController;
    private readonly categoryController: CategoryController;

    constructor(userController: UserController, categoryController: CategoryController) {
        if (!userController) {
            throw new Error("Provided User Controller instance is not truthy!");
        }
        if (!categoryController) {
            throw new Error("Provided Category Controller instance is not truthy!");
        }
        this.userController = userController;
        this.categoryController = categoryController;
        this.router = Router();
        this._init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private _init() {
        this.router.use("/users", this.userController.getRouter());
        this.router.use("/categories", this.categoryController.getRouter());
    }
}