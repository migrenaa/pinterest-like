// import { model, Model, Schema, Document } from "mongoose";
// import { User } from "../types/user";
// import { PassThrough } from "stream";
// import * as bcrypt from "bcrypt";


// export interface PostModel extends Document { }

// const postSchema: Schema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: Number,
//         enum: [0, 1],
//         default: 0,
//         required: true
//     },
//     token: {
//         type: String
//     }
// });

// postSchema.pre("save", function (next: any) {
//     const user = this;
//     if (user.isNew || user.isModified("password")) {
//         bcrypt.genSalt(10, (err: any, salt: any) => {
//             bcrypt.hash(user.password, salt, (err: any, hash: any) => {
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else next();
// });

// postSchema.methods.comparePassword = function (candidatePassword: string, cb: Function) {
//     bcrypt.compare(candidatePassword, this.password, function (err: any, isMatch: any) {
//         if (err) return cb(err);
//         cb(undefined, isMatch);
//     });
// };

// export const UserSchema: Model<UserModel> = model<UserModel>("User", userSchema);
