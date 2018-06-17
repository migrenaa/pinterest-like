const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
const userStore = require( "../stores/user.store");
dotenv.config({ path: ".env" });


export namespace JWT {

    export function configAuth(passport: any) {
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: process.env.CONFIG_KEY,
        };

        passport.use(new JwtStrategy(options, (jwt_payload: any, done: any) => {
            userStore.getById(jwt_payload._id, (err: any, user: any) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(undefined, user);
                } else done(undefined, false);
            });
        }));
    }

    export function generateToken(jwtObject: any) {
        return jwt.sign(jwtObject, process.env.CONFIG_KEY, {
            expiresIn: "8h"
        });
    }
}