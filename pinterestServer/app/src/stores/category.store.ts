const knex = require("knex")(require("../../knexfile"));

export namespace CategoryStore {

    export function getById(id: number) {
        return knex("categories").where("id", id).first();
    }
    export function search(name: string) {
        return knex("categories")
            .where("name", name);
    }
    export function getAll() {
        return knex("categories");
    }
    export function create(name: string, description: string) {
        return knex("categories").insert({
            name: name,
            description: description,
        }).returning("id");
    }
}
