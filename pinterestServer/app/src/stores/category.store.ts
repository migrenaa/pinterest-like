import { RoleType } from "../types/enums";
const knex = require("knex")(require("./knexfile"));

module.exports = {
  createUser (username: string, password: string, role: RoleType) {
    console.log(`Add user ${username} with password ${password}`);
    console.log(role);
    return knex("user").insert({
      username,
      password,
      role
    }).returning("id");
  }
};