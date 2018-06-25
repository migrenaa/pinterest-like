const knex = require("knex")(require("../../knexfile"));

export namespace UserStore {
      export function getByEmail(email: string) {
            return knex("users").where("email", email).first();
      }
      export function getById(id: number) {
            return knex("users").where("id", id).first();
      }
      export function create(name: string, email: string, password: string, role: number, token: string) {
            return knex("users").insert({
                  name: name,
                  email: email,
                  password: password,
                  role: role,
                  token: token,
            }).returning("id");
      }
      export function update(name: string, email: string, password: string, role: number, token: string) {
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
