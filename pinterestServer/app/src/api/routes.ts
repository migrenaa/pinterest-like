/**
 * Copyright (c) 2018 Centroida.AI All rights reserved.
 */

import { Router } from "express";

export default class ApiRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
        this._init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private _init() {
        // this.router.use("/", this.fabricCaController.getRouter());
    }
}