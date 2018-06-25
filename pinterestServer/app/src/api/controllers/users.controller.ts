import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router } from "express";
import { UserStore } from "../../stores/user.store";
dotenv.config({ path: ".env" });
import { JWT } from "../../config/passport.config";
import * as bcrypt from "bcrypt";

export default class UserController {
    private router: Router;
    constructor() {
        this.router = Router();
        this.router.post("/", (req: any, res: any, next: any) => { this.register(req, res, next); });
        this.router.post("/login", (req: any, res: any, next: any) => { this.login(req, res, next); });
    }

    public getRouter(): Router {
        return this.router;
    }

    public async register(req: Request, res: Response, next: NextFunction) {

        console.log("register user called");
        const user = await UserStore.getByEmail(req.body.email);
        if (user) {
            res.status(302).send({ success: false, message: "User already exists!" });
        } else {
            await bcrypt.hash(req.body.password, 10, (err, hash) => {
                UserStore.create(
                    req.body.name,
                    req.body.email,
                    hash,
                    0,
                    JWT.generateToken({ email: req.body.email })
                ).then((id: Array<number>) => {
                    res.status(201).send({ id: id[0] });
                });
            });
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const user = await UserStore.getByEmail(req.body.email);
        if (!user) {
            res.status(404).send({ success: false, message: "User not found!" });
        } else {
            bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
                if (isMatch) {
                    const jwtObject = {
                        _id: user._id,
                        email: user.email,
                        name: user.name
                    };
                    await UserStore.update(
                        user.name,
                        user.email,
                        user.password,
                        user.role,
                        JWT.generateToken(jwtObject));
                    res.status(200).send(
                        {
                            token: `jwt ${user.token}`,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        }
                    );
                } else {
                    res.status(400).send({ success: false, message: "Wrong password!" });
                }
            });
        }
    }
}