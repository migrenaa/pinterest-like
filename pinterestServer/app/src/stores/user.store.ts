const knex = require("knex")(require("../../knexfile"));

export default class UserStore {
      getByEmail(email: string) {
            return knex("users").where("email", email).first();
      }
      getById(id: number) {
            return knex("users").where("id", id).first();
      }
      create(name: string, email: string, password: string, role: number, token: string) {
            return knex("users").insert({
                  name: name,
                  email: email,
                  password: password,
                  role: role,
                  token: token,
            }).returning("id");
      }
      update(name: string, email: string, password: string, role: number, token: string) {
            return knex("users")
                        .where("id", email)
                        .first()
                        .update({
                              name: name,
                              email: email,
                              password: password,
                              role: role,
                              token: token,
                        }).returning("id");
      }
}
