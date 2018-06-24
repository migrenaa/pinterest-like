const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import UserStore from "../stores/user.store";


import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
dotenv.config({ path: ".env" });


export namespace JWT {

    export function configAuth(passport: any) {
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: process.env.CONFIG_KEY,
        };

        passport.use(new JwtStrategy(options, (jwt_payload: any, done: any) => {
            const userStore = new UserStore();
            const user = userStore.getById(jwt_payload._id);
            if (user) {
                done(undefined, user);
            } else {
                done(undefined, false);
            }
        }));
    }

    export function generateToken(jwtObject: any) {
        return jwt.sign(jwtObject, process.env.CONFIG_KEY, {
            expiresIn: "8h"
        });
    }
}