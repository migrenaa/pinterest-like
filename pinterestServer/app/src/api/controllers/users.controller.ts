import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Router } from "express";
import UserStore from "../../stores/user.store";
import { PostStore } from "../../stores/post.store";
dotenv.config({ path: ".env" });
import { JWT } from "../../config/passport.config";
import * as bcrypt from "bcrypt";
import * as passport from "passport";



export default class UserController {
    private router: Router;
    private userStore: UserStore;
    constructor() {
        this.router = Router();
        this.userStore = new UserStore();
        this.router.post("/", (req: any, res: any, next: any) => { this.register(req, res, next); });
        this.router.post("/login", (req: any, res: any, next: any) => { this.login(req, res, next); });
        this.router.route("/posts")
                .post(passport.authenticate("jwt", { session: false }),
                (req, res, next) => this.addPost(req, res, next));
    }

    public getRouter(): Router {
        return this.router;
    }

    public async register(req: Request, res: Response, next: NextFunction) {

        console.log("register user called");
        const user = await this.userStore.getByEmail(req.body.email);
        if (user) {
            res.status(302).send({ success: false, message: "User already exists!" });
        } else {
            await bcrypt.hash(req.body.password, 10, (err, hash) => {
                this.userStore.create(
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
        const user = await this.userStore.getByEmail(req.body.email);
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
                    await this.userStore.update(
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


    public async addPost(req: Request, res: Response, next: NextFunction) {
        // const token = req.headers["authorization"];
        // console.log(token);

        // const decoded = jwt.decode(token.toString(), {});
        // console.log(decoded);
        // res.status(404);
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



    // public update(req: Request, res: Response, next: NextFunction) {
    //     UserSchema.findOneAndUpdate(
    //         { email: { $in: [req.body.email] } },
    //         { $set: { name: req.body.name, ethereumWallet: req.body.ethereumWallet } },
    //         { new: true }, (err: string, user: User) => {
    //             if (!user) {
    //                 res.status(404).send({ success: false, message: "User not found!" });
    //             } else {
    //                 res.status(200).send(
    //                     {
    //                         name: user.name,
    //                         email: user.email,
    //                         ethereumWallet: user.ethereumWallet
    //                     }
    //                 );
    //             }
    //         });
    // }

    // public changePassword(req: Request, res: Response, next: NextFunction) {
    //     UserSchema.findOne({ email: { $in: [req.body.email] } }, (err: string, user: any) => {
    //         if (!user) {
    //             res.status(404).send({ success: false, message: "User not found!" });
    //         } else {
    //             user.comparePassword(req.body.oldPassword, (err: any, isMatch: boolean) => {
    //                 if (isMatch) {
    //                     user.password = req.body.newPassword;
    //                     user.save();
    //                     res.status(200).send({ message: "Password is successfully changed!" });
    //                 } else {
    //                     res.status(400).send({ message: "Incorrect password!" });
    //                 }
    //             });
    //         }
    //     });
    // }

    // public forgottenPassword(req: Request, res: Response, next: NextFunction) {
    //     UserSchema.findOne({ email: { $in: [req.body.email] } }, (err: string, user: UserModel) => {
    //         if (!user) {
    //             res.status(404).send({ success: false, message: "User not found!" });
    //         } else {
    //             user.password = Math.random().toString(36).slice(-8);
    //             // TODO send mail
    //             user.save();
    //             res.status(200).send({ message: "An email containing your new password is sent!" });
    //         }
    //     });
    // }
