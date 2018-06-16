import { RoleType } from "./enums";

 export class User {
    name: string;
    email: string;
    password: string;
    role: RoleType;
    token?: string;
    ethereumWallet?: string;
    btcAddress?: string;
    btcBalance?: number;

    isEmailConfirmed: boolean;
 }
