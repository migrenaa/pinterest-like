/**
 * Copyright (c) 2018 Centroida.AI All rights reserved.
 */

import { Router } from "express";
import UserController from "../api/controllers/users.controller";
export default class ApiRouter {
    private readonly router: Router;
    private readonly userController: UserController;

    constructor(userController: UserController) {
        if (!userController) {
            throw new Error("Provided User Controller instance is not truthy!");
        }
        this.userController = userController;
        this.router = Router();
        this._init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private _init() {
        this.router.use("/users", this.userController.getRouter());
    }
}