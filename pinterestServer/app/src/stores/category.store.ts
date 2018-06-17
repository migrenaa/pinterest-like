const knex = require("knex")(require("../../knexfile"));

export namespace CategoryStore {

    export function getById(id: number) {
        return knex("categories").where("id", id).first();
    }
    export function getAll() {
        return knex("categories");
    }
}
