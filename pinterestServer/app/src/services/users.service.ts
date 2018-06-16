/**
 * Copyright (c) 2017 Centroida.AI All rights reserved.
 */

import { Request, Response, NextFunction } from "express";
import { UserSchema, UserModel } from "../../../app/src/schemas/user.schema";
import { User } from "../../../app/src/types/user";
import { JWT } from "../config/passport.config";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });


export default class UserController {

    public register(req: Request, res: Response, next: NextFunction) {
        UserSchema.findOne({ email: { $in: [req.body.email] } }, (err: string, user: User) => {
            if (user) {
                res.status(302).send({ success: false, message: "User already exists!" });
            } else {
                const newUser: UserModel = new UserSchema({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    token: JWT.generateToken({ email: req.body.email })
                });
                newUser.save((err: string, user: User) => {
                });
                res.status(201).send({ message: "Please, confirm your email!" });
            }
        });
    }

    public login(req: Request, res: Response, next: NextFunction) {
        UserSchema.findOne({ email: { $in: [req.body.email] } }, (err: string, user: any) => {
            if (!user) {
                res.status(404).send({ success: false, message: "User not found!" });
            } else {
                user.comparePassword(req.body.password, (err: any, isMatch: any) => {
                    if (!isMatch) {
                        res.status(400).send({ success: false, message: "Wrong password!" });
                    } else {
                        const jwtObject = {
                            _id: user._id,
                            email: user.email,
                            name: user.name
                        };

                        user.token = `jwt ${JWT.generateToken(jwtObject)}`;
                        user.save();
                        res.status(200).send(
                            {
                                token: user.token,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            }
                        );
                    }
                });
            }
        });
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

}

